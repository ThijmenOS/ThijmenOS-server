import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function writeFile(path, content) {
  const messageId = sysCall("writeFile", {
    path: path,
    content: content,
  });

  return await listen(messageId);
}

export default writeFile;
