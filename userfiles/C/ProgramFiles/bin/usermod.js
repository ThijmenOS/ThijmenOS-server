import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function usermod(username) {
  const messageId = sysCall("changeUsername", username);

  const value = await listen(messageId);

  return value;
}

export default usermod;
