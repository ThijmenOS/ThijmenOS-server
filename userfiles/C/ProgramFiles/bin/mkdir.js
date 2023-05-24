import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function mkdir(path, name) {
  const messageId = sysCall("mkdir", {
    directoryPath: path,
    name: name,
  });

  return await listen(messageId);
}

export default mkdir;
