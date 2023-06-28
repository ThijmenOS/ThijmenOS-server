import sysCall from "./sysCall.js";
import listen from "./listen.js";
import { NO_USER_SIGNED_IN } from "./errors/userErrors.js";

async function user() {
  const messageId = sysCall("user");

  const value = await listen(messageId);

  if (value === 1) return NO_USER_SIGNED_IN;

  return value;
}

export default user;
