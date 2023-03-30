self.addEventListener("message", (m) => {
  if(m.data.eventName === "openFile") {
    postMessage({
      method: "spawnWindow",
      params: {guiPath: "C/ProgramFiles/noteblock/noteblock-gui.html", args: m.data.eventData},
    });
    postMessage({
      method: "terminateProcess"
    });
  }
})
