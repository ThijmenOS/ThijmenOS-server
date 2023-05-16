import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function ls(path) {
  const messageId = sysCall("listFiles", path);

  return await listen(messageId);
}

export default ls;
