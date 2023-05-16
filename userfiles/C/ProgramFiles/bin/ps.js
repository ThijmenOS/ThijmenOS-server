import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function ps() {
  const messageId = sysCall("getProcesses");

  const result = await listen(messageId);

  return result;
}

export default ps;
