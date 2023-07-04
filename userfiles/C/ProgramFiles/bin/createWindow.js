import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function createWindow(path, options) {
  const messageId = sysCall("createWindow", {
    path: path,
    windowOptions: options,
  });

  const value = await listen(messageId);

  return value;
}

export default createWindow;
