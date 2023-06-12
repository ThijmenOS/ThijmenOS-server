import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function rm(path) {
  const messageId = sysCall("rm", path);

  return await listen(messageId);
}

export default rm;
