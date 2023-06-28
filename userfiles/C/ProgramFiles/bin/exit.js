import sysCall from "./sysCall.js";

class exit {
  constructor(code) {
    sysCall("exit", code);
  }
}

export default exit;
