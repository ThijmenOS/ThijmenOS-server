import sysCall from "./sysCall.js";
import listen from "./listen.js";

async function killMq(msbId) {
  const messageId = sysCall("killMq", msbId);

  return await listen(messageId);
}

export default killMq;
