import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function rmdir(path) {
  const messageId = sysCall("rmdir", path);

  return await listen(messageId);
}

export default rmdir;
