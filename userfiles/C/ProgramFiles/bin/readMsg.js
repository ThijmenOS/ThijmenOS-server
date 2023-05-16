import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function readMsg(msqId) {
  const messageId = sysCall("readMsg", msqId);

  return await listen(messageId);
}

export default readMsg;
