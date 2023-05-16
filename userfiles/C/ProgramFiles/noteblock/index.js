import * as OS from "../bin/index.js";

OS.startup(start);

let pid;
let mqHandle;
let fileSelectLoop;

function initGui() {
  const openFileButton = document.getElementById("open-file");
  openFileButton.addEventListener("click", OpenFile);
}

async function start(args) {
  initGui();
  await loadFileContent(args);
}

async function loadFileContent(filePath) {
  clearInterval(fileSelectLoop);
  if (!filePath) return;

  const content = await OS.readFile(filePath);

  DisplayFileContent(content);
}

function DisplayFileContent(content) {
  const textAreaElement = document.getElementById("content");

  textAreaElement.innerHTML = content;
}

async function OpenFile() {
  pid = await OS.fDialog();
  mqHandle = await OS.mqOpen("DebugMQ", [0, 3], 5);

  if (mqHandle === -1) {
    OS.killp(pid);
  }

  fileSelectLoop = setInterval(async () => {
    const message = await OS.readMsg(mqHandle);
    if (message === -1) return;
    if (message) {
      OS.killMq(mqHandle);
      OS.killp(pid);
      loadFileContent(message.path);
    }
  }, 100);
}
