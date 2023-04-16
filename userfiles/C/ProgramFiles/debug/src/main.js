import OS, {
  CloseSelf,
} from "@thijmen-os/developmentkit";

const debug1 = document.getElementById("debug-1");
debug1.addEventListener("click", () => {
  OS.callCommand("spawnWindow", "C/ProgramFiles/testProgram/test.html");
});

const debug2 = document.getElementById("debug-2");
debug2.addEventListener("click", () => CloseSelf());

document
  .getElementById("debug-3")
  .addEventListener("click", () =>
    OS.callCommand("changeDir", "C/Users/Thijmen/Desktop/")
  );

document.getElementById("debug-4").addEventListener("click", () =>
  OS.callCommand("touch", {
    directoryPath: "C/Users/Thijmen/Documents/new folder",
    name: "new file.txt",
  })
);

document.getElementById("debug-5").addEventListener("click", () => {
  OS.callCommand("filesInDir", "C/Users/Thijmen/Documents/", (res) =>
    console.log(res.eventData)
  );
});

document.getElementById("debug-6").addEventListener("click", () =>
  OS.callCommand("mkdir", {
    directoryPath: "C/Users/Thijmen/Documents",
    name: "new folder",
  })
);

document
  .getElementById("debug-7")
  .addEventListener("click", () =>
    OS.callCommand("rmdir", "C/Users/Thijmen/Documents/new folder")
  );

document
  .getElementById("debug-8")
  .addEventListener("click", () =>
    OS.callCommand(
      "readFile",
      "C/OperatingSystem/ThijmenOSdata/settings.json",
      (res) => console.log(res.eventData)
    )
  );

document
  .getElementById("debug-9")
  .addEventListener("click", () =>
    OS.callCommand("startProcess", "C/ProgramFiles/debug/dist", (res) =>
      console.log(res.eventData)
    )
  );

document
  .getElementById("debug-11")
  .addEventListener("click", () =>
    OS.callCommand("listProcesses", null, (res) => console.log(res.eventData))
  );
