class OS {
  #listen(callback) {
    window.onmessage = (e) => {
      callback(e.data);
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
