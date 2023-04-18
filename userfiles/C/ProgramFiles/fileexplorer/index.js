import OS from "../operatingSystemApi.js";

OS.onStartup((args) => interpretArgs(args))

function interpretArgs(args) {
    const argFlags = args.split(" ");
    const modeFlag = argFlags.findIndex((arg) => arg === "--mode")
    if(modeFlag < 0) {
        startRegular()
        return;
    }

    const mode = argFlags[modeFlag + 1];
    const availableModes = ["file_select"]
    if(!mode || !availableModes.includes(mode)) {
        OS.callCommand("terminateProcess");
        throw new Error("Selected Mode is not supported")
    }

    const parentPidFlag = argFlags.findIndex((arg) => arg === "--pid")
    if(parentPidFlag < 0) throw new Error("ParentPid not defined")

    const parentPid = argFlags[parentPidFlag + 1];

    startSelectClient(parentPid);
}

function startRegular() {
    OS.callCommand("spawnWindow", {guiPath: "C/ProgramFiles/fileexplorer/applicationClient/gui.html"})
}

function startSelectClient(parentPid) {
    OS.callCommand("spawnWindow", {guiPath: "C/ProgramFiles/fileexplorer/fileSelectClient/gui.html", args: parentPid})

}
