postMessage({
  method: "spawnWindow",
  params: "C/ProgramFiles/debug/dist/index.html",
});

postMessage({
  method: "terminateProcess",
});
