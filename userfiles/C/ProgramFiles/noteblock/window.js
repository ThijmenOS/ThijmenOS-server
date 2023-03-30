onmessage = ev => interpretMessage(ev.data);

function interpretMessage(messageData) {
    if(messageData.eventName === "startedApplication") {
        window.top.postMessage({
            origin: window.name,
            method: "readFile",
            params: messageData.eventData
        }, "*")
    }

    if(messageData.eventName === "selfInvoked") {
        openFile(messageData.eventData)
    }
}

function openFile(fileContent) {
    const el = document.getElementById("content");

    el.innerHTML = fileContent
}
