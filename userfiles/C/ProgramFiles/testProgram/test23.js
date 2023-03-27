postMessage({
  method: "spawnWindow",
  params: "C/ProgramFiles/testProgram/test.html",
});

setTimeout(() => {
  postMessage({
    method: "terminateProcess",
  });
}, 1000);
