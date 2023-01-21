class OS {
  on(eventName, callback) {
    window.onmessage = ({ data }) => {
      if (data.eventName === eventName) callback(data);
    };
  }

  #listen(callback) {
    window.onmessage = ({ data }) => {
      callback(data);
    };
  }
  call(method, params, callback) {
    window.top.postMessage(
      {
        origin: window.name,
        method: method,
        params: params,
      },
      "*"
    );

    if (callback) this.#listen(callback);
  }
}
