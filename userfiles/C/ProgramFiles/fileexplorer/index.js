import fileIcons from "./icons/icons.js";

onmessage = ev => interpretMessage(ev.data);

let history = ["C"];
let currentPathIndex = 0
let currentPath = history[currentPathIndex];

init();

function init() {
    document.getElementById("left-arrow").addEventListener("click", handleBack);
    document.getElementById("right-arrow").addEventListener("click", handleForward);

    listFiles(currentPath);
}

function interpretMessage(messageData) {
    if(messageData.eventName === "listFiles") {
        pupulateHtml(messageData.eventData);
        console.log(messageData.eventData)
    }
}

function handleBack() {
    if(currentPathIndex === 0) return;

    currentPathIndex -= 1;
    listFiles(history[currentPathIndex])
}

function handleForward() {
    if(currentPathIndex === history.length - 1) return;

    currentPathIndex += 1;

    listFiles(history[currentPathIndex])
}

function appendToHistory(path) {
    history.push(path);
    currentPathIndex++;
}

function setCurrentPath(path) {
    const historyElement = document.getElementById("path-history");
    
    historyElement.value = path;
}

function communicateWithOS(method, params) {
    window.top.postMessage({
        origin: window.name,
        method: method,
        params: params
    }, "*")
}


function handleClick(path, isDir) {
    if(isDir) {
        listFiles(path);
        appendToHistory(path)
    } else {
        openFile(path);
    }
}

function listFiles(dir) {
    communicateWithOS("listFiles", dir)

    setCurrentPath(dir);
}

function openFile(path) {
    const mimetype = path.split(".").at(-1);

    if(!mimetype) return;

    communicateWithOS("openFile", {
        filePath: path,
        mimeType: mimetype
    })
}

function pupulateHtml(files) {
    const el = document.getElementById("current-directory");
    el.innerHTML = null;

    const constructImage = (type) => {
        const img = document.createElement("img");
        img.src = `/static/C/OperatingSystem/Icons/file_type_${fileIcons[type]}.svg`
        img.classList.add("file-type-icon")

        return img;
    }

    const constructText = (name) => {
        const text = document.createElement("p");
        text.innerText = name;
        
        return text;
    }

    const constructSpan = (img, text) => {
        const span = document.createElement("span");
        span.classList.add("file-explorer-listing-entry")
        span.appendChild(img);
        span.appendChild(text);

        return span;
    }

    const constructList = (span, file) => {
        const list = document.createElement("li");
        list.addEventListener("click", () => handleClick(file.filePath, file.isDir));
        list.classList.add("file-explorer-listing")
        list.appendChild(span);

        return list;
    }

    const listEl = document.createElement("ul");
    files.forEach(file => {
        const text = constructText(file.filePath.split("/").at(-1));
        const img = constructImage(!file.isDir ? file.filePath.split(".").at(-1) : "dir");

        const span = constructSpan(img, text);

        listEl.appendChild(constructList(span, file));
    });

    el.appendChild(listEl);
}
