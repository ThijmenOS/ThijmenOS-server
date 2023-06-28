import sysCall from "./sysCall.js";
import listen from "./listen.js";
import { NO_RESOURCE_ACCESS } from "./errors/noResourceError.js";
import { COULD_NOT_OPEN_FILE } from "./errors/fileErrors.js";

async function fopen(path, mode) {
  const messageId = sysCall("fopen", {
    path: path,
    mode: mode,
  });

  const result = await listen(messageId);

  if (result === 1) return NO_RESOURCE_ACCESS;
  if (result === 2) return COULD_NOT_OPEN_FILE;

  return result;
}

export default fopen;
