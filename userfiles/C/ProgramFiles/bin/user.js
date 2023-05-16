import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function user() {
  const messageId = sysCall("user");

  const value = await listen(messageId);

  return value;
}

export default user;
