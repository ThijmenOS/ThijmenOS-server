import sysCall from "./sysCall.js";
import listen from "./listen.js";
import { NO_RESOURCE_ACCESS, UNKNOWN_FILE_ERROR } from "./errors/index.js";

async function touch(path, name) {
  const messageId = sysCall("touch", {
    directoryPath: path,
    name: name,
  });

  const result = await listen(messageId);

  if (result === 1) return NO_RESOURCE_ACCESS;
  if (result === 2) return UNKNOWN_FILE_ERROR;

  return result;
}

export default touch;
