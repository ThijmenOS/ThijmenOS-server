import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function memWrite(memKey, data) {
  const messageId = sysCall("memWrite", {
    memoryKey: memKey,
    data: data,
  });

  return await listen(messageId);
}

export default memWrite;
