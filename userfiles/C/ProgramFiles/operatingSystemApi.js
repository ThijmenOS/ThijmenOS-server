class OS {
  static #generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random % 4) + 8;
      return value.toString(16);
    });
  }
  
  static onStartup(callback) {
    window.onmessage = ({ data }) => {
      if (data.event === "Startup_Args") callback(data.args);
    };
  }

  static #listen(callback) {
    window.onmessage = ({ data }) => {
      callback(data);
    };
  }
  static callCommand(method, params, callback) {
    window.top.postMessage(
      {
        origin: window.name,
        method: method,
        params: params,
        hash: this.#generateUUID()
      },
      "*"
    );

    if (callback) this.#listen(callback);
  }
}

export default OS;
