import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function memAlloc(memKey, access) {
  const messageId = sysCall("memAlloc", {
    memoryKey: memKey,
    memoryAccess: access,
  });

  return await listen(messageId);
}

export default memAlloc;
