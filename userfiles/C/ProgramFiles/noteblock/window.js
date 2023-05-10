import OS from "../operatingSystemApi.js";

OS.onStartup((args) => interpretMessage(args))

const openFileButton = document.getElementById("open-file");

init()

function init() {
    openFileButton.addEventListener("click", () => openFile())
}

function interpretMessage(filePath) {
    if(filePath) {
        OS.callCommand("readFile", filePath, (ev) => readFile(ev));
    }
}

function openFile() {
    OS.callCommand("selectFile");
}

function readFile(fileObject) {
    if(fileObject.id !== 0) {
        throw new Error(fileObject.data);
    }

    const el = document.getElementById("content");

    el.innerHTML = fileObject.data;
}
