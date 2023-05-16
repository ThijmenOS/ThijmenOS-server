function generateId() {
  return Math.floor(100000 + Math.random() * 900000);
}

function sysCall(method, data) {
  const messageId = generateId();

  if (typeof window !== "undefined") {
    window.top.postMessage(
      {
        pid: window.name,
        method: method,
        params: data,
        messageId: messageId,
      },
      "*"
    );
  } else {
    postMessage({
      method: method,
      params: data,
      messageId: messageId,
    });
  }

  return messageId;
}

export default sysCall;
