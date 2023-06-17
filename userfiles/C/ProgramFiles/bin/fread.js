import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function fread(fileHandle) {
  const messageId = sysCall("fread", fileHandle);

  return await listen(messageId);
}

export default fread;
