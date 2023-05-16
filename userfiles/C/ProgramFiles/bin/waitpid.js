import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function waitpid(pid, callback) {
  const messageId = sysCall("waitpid", pid);

  const value = await listen(messageId);

  if (callback) {
    return callback(value);
  }

  return value;
}

export default waitpid;
