import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function memRead(memKey) {
  const messageId = sysCall("memAlloc", memKey);

  return await listen(messageId);
}

export default memRead;
