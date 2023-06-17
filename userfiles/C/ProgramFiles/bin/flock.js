import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function flock(fileHandle) {
  const messageId = sysCall("flock", fileHandle);

  const result = await listen(messageId);

  return result;
}

export default flock;
