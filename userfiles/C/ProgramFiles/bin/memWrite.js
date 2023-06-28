import sysCall from "./sysCall.js";
import listen from "./listen.js";
import { PARAMETER_ERROR } from "./errors/paramError.js";

async function memWrite(memKey, data) {
  const messageId = sysCall("memWrite", {
    memoryKey: memKey,
    data: data,
  });

  const result = await listen(messageId);

  if (result === 1) return PARAMETER_ERROR;

  return result;
}

export default memWrite;
