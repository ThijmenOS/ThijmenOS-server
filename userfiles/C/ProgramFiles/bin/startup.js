import listen from "./listen.js";

async function startup(callback) {
  const messageId = "startup";

  const result = await listen(messageId);

  if (callback) {
    return callback(result);
  } else {
    return result;
  }
}

export default startup;
