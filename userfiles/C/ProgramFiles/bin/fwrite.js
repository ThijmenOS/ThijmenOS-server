import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function fwrite(fileHandle, content) {
  const messageId = sysCall("fwrite", {
    fileHandle: fileHandle,
    content: content,
  });

  const result = await listen(messageId);

  return result;
}

export default fwrite;
