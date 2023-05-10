import OS from "../operatingSystemApi.js";

OS.onStartup((args) => loadGui(args))

function loadGui(args) {
  window.top.postMessage({
    origin: window.name,
    method: "spawnWindow",
    params: {guiPath: "C/ProgramFiles/noteblock/noteblock-gui.html", args: args}
  }, "*");
}
