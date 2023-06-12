import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function pstart(exePath, args) {
  const messageId = sysCall("startProcess", {
    exePath: exePath,
    args: args,
  });

  const result = await listen(messageId);

  if (result == 1) return "FILE_PATH_NOT_FOUND";
  if (result == -1) return "UNKNOWN_ERROR";
  if (result == 2) return "FILE_TYPE_NOT_EXECUTABLE";

  return result;
}

export default pstart;
