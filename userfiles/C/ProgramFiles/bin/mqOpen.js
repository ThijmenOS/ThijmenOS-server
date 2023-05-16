import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function mqOpen(name, flags, bufferSize) {
  const messageId = sysCall("mqOpen", {
    name: name,
    flags: flags,
    bufferSize: bufferSize,
  });

  return await listen(messageId);
}

export default mqOpen;
