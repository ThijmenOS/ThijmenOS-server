import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function auth(userId, password) {
  const messageId = sysCall("auth", {
    userId: userId,
    password: password,
  });

  const value = await listen(messageId);

  return value;
}

export default auth;
