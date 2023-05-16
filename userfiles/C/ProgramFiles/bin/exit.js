import sysCall from "./sysCall.js";

function exit(code) {
  sysCall("exit", code);
}

export default exit;
