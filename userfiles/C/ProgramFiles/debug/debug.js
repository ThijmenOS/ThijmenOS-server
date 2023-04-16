let memKey = "Some_Memorykey"

onmessage = ev => console.log(ev.data);

postMessage({
  method: "spawnWindow",
  params: {guiPath: "C/ProgramFiles/debug/index.html"},
});

postMessage({
  method: "memAlloc",
  params: {memoryKey: memKey, memoryAccess: [0,1]},
});

postMessage({
  method: "memWrite",
  params: {memoryKey: memKey, data: "This is some very cool data! Wohooo"},
});