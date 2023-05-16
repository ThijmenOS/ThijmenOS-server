import * as OS from "../bin/index.js";

OS.startup(() => startup());

const tableElement = document.getElementById("p-table");

async function startup() {
  MainLoop();
}

function createEntry(input) {
  const tr = document.createElement("tr");
  input.forEach((label) => {
    const td = document.createElement("td");
    td.innerHTML = label;
    tr.appendChild(td);
  });

  const delButton = document.createElement("td");
  delButton.innerHTML = "Delete";
  delButton.addEventListener("click", () => killProcess(input[1]));
  tr.appendChild(delButton);

  tableElement.appendChild(tr);
}

function processChange(processes) {
  tableElement.innerHTML = "";
  processes.forEach((process) => {
    createEntry([process.name, process.pid, process.processType]);
  });
}

function killProcess(pid) {
  OS.killp(pid);
}

function MainLoop() {
  let snapshot;
  setInterval(async () => {
    const processes = await OS.ps();
    const strProcesses = JSON.stringify(processes);

    if (strProcesses !== snapshot) {
      snapshot = strProcesses;
      processChange(processes);
    }
  }, 100);
}
