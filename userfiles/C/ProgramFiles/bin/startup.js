import listen from "./listen.js";
import sysCall from "./sysCall.js";

async function startup(startupArgs, callback) {
  const messageId = "startup";

  sysCall("startup", startupArgs);

  const result = await listen(messageId);

  if (callback) {
    return callback(result);
  }

  return result;
}

export default startup;
