import { ThijmenOS } from "../operatingSystemApi.js";
const OS = new ThijmenOS("worker");

let pid;
let mqHandle;

await OS.startup(init);

async function init(args) {
  pid = await OS.selectFile();

  mqHandle = await OS.mqOpen("DebugMQ", [0]);

  if (mqHandle === -1) {
    OS.exit(1);
  }
}

setInterval(async () => {
  const message = await OS.readMsg(mqHandle);
  if (!message) return;
  if (message) {
    OS.openFile(message.path, message.mimetype);
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
