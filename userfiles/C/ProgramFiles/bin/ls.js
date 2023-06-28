import sysCall from "./sysCall.js";
import listen from "./listen.js";
import { NO_RESOURCE_ACCESS } from "./errors/noResourceError.js";

async function ls(path) {
  const messageId = sysCall("ls", path);

  const result = await listen(messageId);

  if (result === 1) return NO_RESOURCE_ACCESS;

  return result;
}

export default ls;
