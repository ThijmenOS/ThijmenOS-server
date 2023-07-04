import listen from "./listen.js";

async function startup(callback) {
  const messageId = "startup";

  const result = await listen(messageId);

  console.log(result);

  if (callback) {
    return callback(result);
  }

  return result;
}

export default startup;
