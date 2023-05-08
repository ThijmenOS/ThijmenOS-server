async function listen(messageId) {
    let response;
    const messagePromise = new Promise((resolve) => {
        window.onmessage = ({data}) => {
            if(data.id === messageId) {
                resolve(data.data);
            }
        }
    })
    await messagePromise.then((val) => response = val);
    return response;
}

function generateId() {
    return Math.floor(100000 + Math.random() * 900000);
}
function sendMessage(method, data) {
    const messageId = generateId();

    window.top.postMessage({
        method: method,
        params: data,
        messageId: messageId
    }, "*")
    return messageId;
}

export async function startup() {
    var res;
    const pr = new Promise((resolve) => {
        onmessage = ({data}) => {
            if(data.id === "startup") {
                data.data ? resolve(data.data) : resolve(0);
            } else {
                resolve(-1)
            }
        }
    })

    await pr.then((value) => res = value);

    return res;
}

export async function readFile(filePath) {
    const messageId = sendMessage("readFile", filePath);

    const result = await listen(messageId);

    return result;
}

