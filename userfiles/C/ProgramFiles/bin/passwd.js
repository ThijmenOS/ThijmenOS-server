import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function passwd(oldPassword, newPassword) {
  const messageId = sysCall("changePwd", {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });

  const value = await listen(messageId);

  return value;
}

export default passwd;
