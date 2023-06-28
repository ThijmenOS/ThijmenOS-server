import * as OS from "../../bin/index.js";
import fileIcons from "../icons/icons.js";

let history = ["C"];
let currentPathIndex = 0;
let currentPath = history[currentPathIndex];

await OS.startup({ winX: 1000, winY: 300 }, () => init());

async function init(args) {
  document.getElementById("left-arrow").addEventListener("click", handleBack);
  document
    .getElementById("right-arrow")
    .addEventListener("click", handleForward);

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
  } else {
    openFile(path);
  }
}

async function listFiles(dir) {
  const files = await OS.ls(dir);

  console.log(files);
  pupulateHtml(files);
  setCurrentPath(dir);
}

async function openFile(path) {
  const mimetype = path.split(".").at(-1);

  if (!mimetype) return;

  console.log(mimetype);

  await OS.Open(path, mimetype);
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
