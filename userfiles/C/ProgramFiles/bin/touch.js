import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function touch(path, name) {
  const messageId = sysCall("touch", {
    directoryPath: path,
    name: name,
  });

  return await listen(messageId);
}

export default touch;
