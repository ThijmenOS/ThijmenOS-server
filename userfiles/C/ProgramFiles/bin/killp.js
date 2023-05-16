import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function killp(pid, exitCode) {
  const messageId = sysCall("kill", {
    pid: pid,
    exitCode: exitCode,
  });

  return await listen(messageId);
}

export default killp;
