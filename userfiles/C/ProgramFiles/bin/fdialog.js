import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function fdialog() {
  const messageId = sysCall("selectFile");

  return await listen(messageId);
}

export default fdialog;
