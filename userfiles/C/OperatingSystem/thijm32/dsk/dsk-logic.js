import { NO_USER_SIGNED_IN } from "../../../ProgramFiles/bin/errors/userErrors.js";
import * as OS from "../../../ProgramFiles/bin/index.js";
import { memoryKey } from "./constants.js";
import FileIcon from "./fileIcon/fileIcon.js";

OS.startup(initialiseDesktop);

function initialiseDesktop() {
  OS.memAlloc(memoryKey, [0, 1]);

  loadDesktop();
}

async function getCurrentUser() {
  const currentUser = await OS.user();

  if (currentUser === NO_USER_SIGNED_IN) {
    throw new OS.exit(-1);
  }

  return currentUser;
}

async function loadDesktop() {
  const currentUser = await getCurrentUser();

  const filesOnDesktop = await OS.ls(currentUser.homeDir);

  if (filesOnDesktop === "NO_RESOURCE_ACCESS") throw new OS.exit(-1);

  const memWrite = await OS.memWrite(memoryKey, filesOnDesktop);

  if (memWrite !== 0) throw new Error(memWrite);

  renderApps(filesOnDesktop);
}

function renderApps(apps) {
  apps.forEach((file) => {
    const icon = new FileIcon();
    icon.ConstructFileIcon(file.filePath);
  });
}
