import * as OS from "../../bin/index.js";
import { BLOCK, NON_BLOCK } from "../../bin/enums/index.js";
import { DisplayFileContent } from "./display-text.js";
import {
  NO_RESOURCE_ACCESS,
  UNKNOWN_FILE_ERROR,
} from "../../bin/errors/index.js";

class fileHandling {
  static fh = null;

  static async OpenFile() {
    const msgQueueName = "OpenFileQueue";

    const pid = await OS.pstart(
      "C/ProgramFiles/fileexplorer/fileSelectClient/gui.html",
      `--mode file_select --msg_queue_name ${msgQueueName}`
    );
    const mqHandle = await OS.mqOpen(msgQueueName, [0, 3], 5);

    if (mqHandle === -1) {
      OS.killp(pid);
    }

    const message = await OS.readMsg(mqHandle, BLOCK);

    if (message === -1) return;
    if (message) {
      OS.killMq(mqHandle);
      OS.killp(pid);

      this.LoadFile(message.path);
    }
  }

  static async SaveFile(fh) {
    const textArea = document.getElementById("content");
    const content = textArea.value;

    await OS.ffree(this.fh);
    await OS.fwrite(fh ?? this.fh, content);
  }

  static async SaveFileAs() {
    const msgQueueName = "SaveFileAsQueue";

    const pid = await OS.pstart(
      "C/ProgramFiles/fileexplorer/fileSelectClient/gui.html",
      `--mode file_save --msg_queue_name ${msgQueueName} --defaultFileName new-notepad-file.txt`
    );
    const mqHandle = await OS.mqOpen(msgQueueName, [0, 3], 5);

    if (mqHandle === -1) {
      OS.killp(pid);
    }

    const message = await OS.readMsg(mqHandle, BLOCK);

    if (message) {
      OS.killMq(mqHandle);
      OS.killp(pid);
    }

    const fh = await OS.touch(message.path, message.name);

    if (fh === NO_RESOURCE_ACCESS || fh === UNKNOWN_FILE_ERROR) {
      console.error(fh);
    }

    this.SaveFile(fh);
  }

  static async LoadFile(filePath) {
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
