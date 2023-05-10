/* eslint-disable complexity */
export class ThijmenOS {
  type = null;

  constructor(type) {
    this.type = type;
  }

  async listen(messageId) {
    if (!this.type)
      throw new Error("Please provide process type: window or worker");

    let response;
    const messagePromise = new Promise((resolve) => {
      const callback = ({ data }) => {
        if (data.id === messageId) {
          resolve(data.data);
        }
      };

      if (this.type === "window") {
        window.onmessage = callback;
      }
      if (this.type === "worker") {
        onmessage = callback;
      }
    });
    await messagePromise.then((val) => (response = val));
    return response;
  }

  generateId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  sendMessage(method, data) {
    if (!this.type)
      throw new Error("Please provide process type: window or worker");

    const messageId = this.generateId();

    if (this.type === "window") {
      window.top.postMessage(
        {
          pid: window.name,
          method: method,
          params: data,
          messageId: messageId,
        },
        "*"
      );
    }
    if (this.type === "worker") {
      postMessage({
        method: method,
        params: data,
        messageId: messageId,
      });
    }

    return messageId;
  }

  async startup(callback) {
    var res;
    const pr = new Promise((resolve) => {
      onmessage = ({ data }) => {
        if (data.id === "startup") {
          data.data ? resolve(data.data) : resolve(0);
        } else {
          resolve(-1);
        }
      };
    });

    await pr.then((value) => (res = value));

    if (callback) {
      callback(res);
      return null;
    } else {
      return res;
    }
  }

  async readFile(filePath) {
    const messageId = this.sendMessage("readFile", filePath);

    const result = await this.listen(messageId);

    return result;
  }

  async exit(code) {
    this.sendMessage("exit", code);
  }

  async startProcess(exePath, args) {
    const messageId = this.sendMessage("startProcess", {
      exePath: exePath,
      args: args,
    });

    return await this.listen(messageId);
  }

  async selectFile() {
    const messageId = this.sendMessage("selectFile");

    return await this.listen(messageId);
  }

  async ls(path) {
    const messageId = this.sendMessage("listFiles", path);

    return await this.listen(messageId);
  }

  async openFile(path, mimetype) {
    const messageId = this.sendMessage("openFile", {
      filePath: path,
      mimeType: mimetype,
    });

    return await this.listen(messageId);
  }

  async waitpid(pid) {
    const messageId = this.sendMessage("waitpid", pid);

    return await this.listen(messageId);
  }
}
