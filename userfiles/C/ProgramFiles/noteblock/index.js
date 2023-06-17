import * as OS from "../bin/index.js";
import { initButtons, initDropdown } from "./ui.js";
import fileHandling from "./methds/file-handling.js";

OS.startup(start);

async function start(args) {
  initDropdown();
  initButtons();

  window.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.key === "s") {
      ev.preventDefault();

      SaveFile();
    }
  });

  if (args.args) {
    fileHandling.LoadFile(args.args);
  }
}
