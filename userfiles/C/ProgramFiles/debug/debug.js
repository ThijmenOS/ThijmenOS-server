import { ThijmenOS } from "../operatingSystemApi.js";
const OS = new ThijmenOS("worker");

await OS.startup();

const pid = await OS.selectFile();

setInterval(async () => {
  const message = await OS.readMsg(pid);
  if (!message) return;
  if (message) {
    OS.openFile(message.path, message.mimetype);
  }

  const exited = await OS.waitpid(pid);
  if (exited === 0) {
    OS.exit();
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
