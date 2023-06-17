import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function ffree(fileHandle) {
  const messageId = sysCall("ffree", fileHandle);

  const result = await listen(messageId);

  return result;
}

export default ffree;
