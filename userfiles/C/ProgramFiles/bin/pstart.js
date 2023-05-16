import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function pstart(exePath, args) {
  const messageId = sysCall("startProcess", {
    exePath: exePath,
    args: args,
  });

  return await listen(messageId);
}

export default pstart;
