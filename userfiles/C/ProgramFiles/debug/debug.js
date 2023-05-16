import * as OS from "../bin/index.js";

let pid;
let mqHandle;

await OS.startup(init);

async function init(args) {
  pid = await OS.fDialog();

  mqHandle = await OS.mqOpen("DebugMQ", [0, 3], 5);

  if (mqHandle === -1) {
    OS.exit(1);
  }
}

setInterval(async () => {
  const message = await OS.readMsg(mqHandle);
  if (message === -1) return;
  if (message) {
    OS.fOpen(message.path, message.mimetype);
    OS.exit(0);
  }

  const exited = await OS.waitpid(pid);
  if (exited !== -1) {
    OS.exit(0);
  }
}, 100);

// let memKey = "Some_Memorykey"

// onmessage = ev => console.log(ev.data);

// postMessage({
//   method: "spawnWindow",
//   params: {guiPath: "C/ProgramFiles/debug/index.html"},
// });

// postMessage({
//   method: "memAlloc",
//   params: {memoryKey: memKey, memoryAccess: [0,1]},
// });

// postMessage({
//   method: "memWrite",
//   params: {memoryKey: memKey, data: "This is some very cool data! Wohooo"},
// });
