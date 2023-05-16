import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function readFile(filePath) {
  const messageId = sysCall("readFile", filePath);

  const result = await listen(messageId);

  return result;
}

export default readFile;
