import * as OS from "../../bin/index.js";
import { BLOCK, NON_BLOCK } from "../../bin/enums/index.js";
import { DisplayFileContent } from "./display-text.js";

class fileHandling {
  static fh = null;
  static fileSelectLoop = null;

  static async OpenFile() {
    const pid = await OS.pstart(
      "C/ProgramFiles/fileexplorer/fileSelectClient/gui.html",
      "--mode file_select"
    );
    const mqHandle = await OS.mqOpen("DebugMQ", [0, 3], 5);

    if (mqHandle === -1) {
      OS.killp(pid);
    }

    // const message = await OS.readMsg(mqHandle, BLOCK);

    // if (message === -1) return;
    // if (message) {
    //   OS.killMq(mqHandle);
    //   OS.killp(pid);

    //   this.LoadFile(message.path);

    this.fileSelectLoop = setInterval(async () => {
      const message = await OS.readMsg(mqHandle, NON_BLOCK);
      if (message === -1) return;
      if (message) {
        OS.killMq(mqHandle);
        OS.killp(pid);

        this.LoadFile(message.path);
      }
    }, 100);
  }

  static async SaveFile() {
    const textArea = document.getElementById("content");
    const content = textArea.value;

    await OS.ffree(this.fh);
    await OS.fwrite(this.fh, content);
  }

  static async LoadFile(filePath) {
    clearInterval(this.fileSelectLoop);
    if (!filePath) return;

    if (this.fh) {
      await OS.ffree(this.fh);
    }

    this.fh = await OS.fopen(filePath, "w");

    const content = await OS.fread(this.fh);
    OS.flock(this.fh);

    DisplayFileContent(content);
  }
}

export default fileHandling;
