import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function cd(path) {
  const messageId = sysCall("cd", path);

  return await listen(messageId);
}

export default cd;
