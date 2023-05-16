import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function sendMsg(msqId, message) {
  const messageId = sysCall("sendMsg", {
    msqId: msqId,
    message: message,
  });

  return await listen(messageId);
}

export default sendMsg;
