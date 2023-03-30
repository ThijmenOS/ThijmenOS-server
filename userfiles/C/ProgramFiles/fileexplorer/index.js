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

function interpretMessage(messageData) {
    if(messageData.eventName === "listFiles") {
        pupulateHtml(messageData.eventData);
        console.log(messageData.eventData)
    }
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
    const el = document.getElementById("main-container");
    el.innerHTML = null;

    const listEl = document.createElement("ul");
    files.forEach(file => {
        const el = document.createElement("li");
        el.innerText = file.filePath.split("/").at(-1);
        el.addEventListener("click", () => handleClick(file.filePath, file.isDir));
        listEl.appendChild(el);
    });

    el.appendChild(listEl);
}
