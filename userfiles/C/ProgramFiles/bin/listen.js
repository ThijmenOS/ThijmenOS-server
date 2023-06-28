async function listen(messageId) {
  let response;
  const messagePromise = new Promise((resolve) => {
    if (typeof window !== "undefined") {
      window.addEventListener("message", ({ data }) => {
        if (data.id === messageId) {
          resolve(data.data);
        }
      });
    } else {
      addEventListener("message", ({ data }) => {
        if (data.id === messageId) {
          resolve(data.data);
        }
      });
    }
  });

  await messagePromise.then((val) => (response = val));
  return response;
}

export default listen;
