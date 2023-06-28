async function listen(messageId) {
  let response;
  const messagePromise = new Promise((resolve) => {
    const callback = ({ data }) => {
      if (data.id === messageId) {
        console.log(data);
        resolve(data.data);
      }
    };

    if (typeof window !== "undefined") {
      window.onmessage = callback;
    } else {
      onmessage = callback;
    }
  });
  await messagePromise.then((val) => (response = val));
  return response;
}

export default listen;
