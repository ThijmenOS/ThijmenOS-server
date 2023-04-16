setInterval(() => {
    console.log("a")
}, 1000);

setTimeout(() => {
    postMessage({
        method: "terminateProcess"
    })
}, 5000);