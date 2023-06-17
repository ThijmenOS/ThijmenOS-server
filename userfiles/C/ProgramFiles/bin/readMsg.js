import sysCall from "./sysCall.js";
import listen from "./listen.js";
import errors from "./errorCodes.js";

async function readMsg(msqId, mode) {
  const messageId = sysCall("readMsg", {
    msqId: msqId,
    mode: mode,
  });

  const result = await listen(messageId);

  if (result === 1) return errors.MESSAGE_BUS_NOT_FOUND;
  if (result === 2) return errors.MESSAGE_BUS_SESSION_NOT_FOUND;
  if (result === 3) return errors.WRITE_ONLY_ERROR;

  return result;
}

export default readMsg;
