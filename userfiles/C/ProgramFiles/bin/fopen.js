import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function fread(path, mode) {
  const messageId = sysCall("fopen", {
    path: path,
    mode: mode,
  });

  return await listen(messageId);
}

export default fread;
