import fileHandling from "./methds/file-handling.js";
import { LaunchNewWindow } from "./methds/new-window.js";
import exit from "../bin/exit.js";

export function initDropdown() {
  const fileButton = document.getElementById("file-button");
  const selectionDropdown = document.getElementById("selection-menu");

  fileButton.addEventListener("click", () => {
    selectionDropdown.classList.add("visible");
  });

  // Close the dropdown menu if the user clicks outside of it
  window.addEventListener("click", ({ target }) => {
    console.log(
      !target.matches(".file-button") && !target.matches(".selection-menu")
    );
    if (!target.matches(".file-button") && !target.matches(".selection-menu")) {
      if (selectionDropdown.classList.contains("visible")) {
        selectionDropdown.classList.remove("visible");
      }
    }
  });
}

export function initButtons() {
  const newWindow = document.getElementById("new-window");
  newWindow.addEventListener("click", () => LaunchNewWindow());

  const openButton = document.getElementById("open");
  openButton.addEventListener("click", () => fileHandling.OpenFile());

  const saveButton = document.getElementById("save");
  saveButton.addEventListener("click", () => fileHandling.SaveFile());

  const closeButton = document.getElementById("close");
  closeButton.addEventListener("click", () => exit(0));

  const saveAsButton = document.getElementById("save-as");
  saveAsButton.addEventListener("click", () => fileHandling.SaveFileAs());
}
