import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function fOpen(path, mimetype) {
  const messageId = sysCall("openFile", {
    filePath: path,
    mimeType: mimetype,
  });

  return await listen(messageId);
}

export default fOpen;
