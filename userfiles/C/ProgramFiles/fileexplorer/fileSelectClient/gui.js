import * as OS from "../../bin/index.js";
import fileIcons from "../icons/icons.js";

let history = ["C"];
let currentPathIndex = 0;
let currentPath = history[currentPathIndex];
let parentPid = null;
let mqHandle;
let startupArgs;

await OS.startup((args) => init(args));

function listenForParentExit() {
  setInterval(() => {
    OS.waitpid(parentPid, (status) => {
      if (status !== -1) OS.exit(0);
    });
  }, 100);
}

function parseArgs(args) {
  const argsArr = args.split(" ");
  const argsObj = {};

  for (let i = 0; i < argsArr.length; i += 2) {
    argsObj[argsArr[i].slice(2)] = argsArr[i + 1];
  }

  return argsObj;
}

async function init(args) {
  parentPid = args.metadata.parentPid;
  startupArgs = parseArgs(args.args);
  listenForParentExit();

  mqHandle = await OS.mqOpen(startupArgs.msg_queue_name, [1]);

  document.getElementById("left-arrow").addEventListener("click", handleBack);
  document
    .getElementById("right-arrow")
    .addEventListener("click", handleForward);

  if (startupArgs.mode === "file_save") {
    const fileNameInput = document.getElementById("file-name");
    fileNameInput.value = startupArgs.defaultFileName ?? "new-file.txt";

    document
      .getElementById("save-as-button")
      .addEventListener("click", () => saveFile(fileNameInput.value));
  }

  setTimeout(() => {
    listFiles(currentPath);
  }, 100);
}

function handleBack() {
  if (currentPathIndex === 0) return;

  currentPathIndex -= 1;
  listFiles(history[currentPathIndex]);
}

function handleForward() {
  if (currentPathIndex === history.length - 1) return;

  currentPathIndex += 1;

  listFiles(history[currentPathIndex]);
}

async function saveFile(fileName) {
  if (!fileName) return;

  const mimetype = fileName.split(".").at(-1);

  const messageCode = await OS.sendMsg(mqHandle, {
    path: history[currentPathIndex],
    name: fileName,
    mimetype: mimetype,
  });

  if (messageCode === 0) {
    OS.exit(0);
  } else {
    console.error(`message failed to send with error code ${messageCode}`);
  }
}

function appendToHistory(path) {
  history.push(path);
  currentPathIndex++;
}

function setCurrentPath(path) {
  const historyElement = document.getElementById("path-history");

  historyElement.value = path;
}

function handleClick(path, isDir) {
  if (isDir) {
    listFiles(path);
    appendToHistory(path);
  }

  if (startupArgs.mode === "file_select") {
    openFile(path);
  }
}

async function listFiles(dir) {
  const files = await OS.ls(dir);
  pupulateHtml(files);
  setCurrentPath(dir);
}

async function openFile(path) {
  const mimetype = path.split(".").at(-1);

  if (!mimetype) return;

  const messageCode = await OS.sendMsg(mqHandle, {
    path: path,
    mimetype: mimetype,
  });
  if (messageCode === 0) {
    OS.exit(0);
  } else {
    console.error(`message failed to send with error code ${messageCode}`);
  }
}

function pupulateHtml(files) {
  const el = document.getElementById("current-directory");
  el.innerHTML = null;

  const constructImage = (type) => {
    const img = document.createElement("img");
    img.src = `/static/C/OperatingSystem/Icons/file_type_${fileIcons[type]}.svg`;
    img.classList.add("file-type-icon");

    return img;
  };

  const constructText = (name) => {
    const text = document.createElement("p");
    text.innerText = name;

    return text;
  };

  const constructSpan = (img, text) => {
    const span = document.createElement("span");
    span.classList.add("file-explorer-listing-entry");
    span.appendChild(img);
    span.appendChild(text);

    return span;
  };

  const constructList = (span, file) => {
    const list = document.createElement("li");
    list.addEventListener("click", () =>
      handleClick(file.filePath, file.isDir)
    );
    list.classList.add("file-explorer-listing");
    list.appendChild(span);

    return list;
  };

  const listEl = document.createElement("ul");
  files.forEach((file) => {
    const text = constructText(file.filePath.split("/").at(-1));
    const img = constructImage(
      !file.isDir ? file.filePath.split(".").at(-1) : "dir"
    );

    const span = constructSpan(img, text);

    listEl.appendChild(constructList(span, file));
  });

  el.appendChild(listEl);
}
