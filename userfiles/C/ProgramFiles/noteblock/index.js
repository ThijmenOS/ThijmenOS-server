// let filePath;

// self.addEventListener("message", (ev) => messageAdapter(ev.data));

postMessage({
  method: "spawnWindow",
  params: "C/ProgramFiles/noteblock/noteblock-gui.html",
});

const channel = new MessageChannel();
postMessage("test123", [channel.port1]);

// function messageAdapter(eventData) {
//   if (eventData.eventName === "openFile") {
//     filePath = eventData.eventData;
//   }
//   if (eventData.eventName === "WindowLaunched") {
//     postMessage({
//       method: "communicateToProcess",
//       params: {
//         data: filePath,
//         pid: eventData.eventData,
//       },
//     });
//   }
// }
