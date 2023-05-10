import { ThijmenOS } from "../operatingSystemApi.js";

const OS = new ThijmenOS("worker");

const args = await OS.startup();

if (args === 0) {
  startRegular();
  OS.exit();
}

const argFlags = args.split(" ");
const modeFlag = argFlags.findIndex((arg) => arg === "--mode");
const mode = argFlags[modeFlag + 1];
const availableModes = ["file_select"];
if (!mode || !availableModes.includes(mode)) {
  OS.exit();
  throw new Error("Selected Mode is not supported");
}

const parentPidFlag = argFlags.findIndex((arg) => arg === "--pid");
if (parentPidFlag < 0) throw new Error("ParentPid not defined");

const parentPid = argFlags[parentPidFlag + 1];

await startSelectClient(parentPid);

async function startRegular() {
  const pid = await OS.startProcess(
    "C/ProgramFiles/fileexplorer/applicationClient/gui.html"
  );
  OS.exit();
}

async function startSelectClient(parentPid) {
  const pid = await OS.startProcess(
    "C/ProgramFiles/fileexplorer/fileSelectClient/gui.html",
    `--parentPid ${parentPid}`
  );
  OS.exit();
}
