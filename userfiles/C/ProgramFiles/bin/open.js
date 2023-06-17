import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function open(path, mimetype) {
  const messageId = sysCall("openFile", {
    filePath: path,
    mimeType: mimetype,
  });

  return await listen(messageId);
}

export default open;
