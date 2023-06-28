import sysCall from "./sysCall.js";
import listen from "./listen.js";
import {
  FILE_DESCRIPTOR_DOES_NOT_EXIST,
  FILE_LOCKED,
} from "./errors/fileErrors.js";
import { UNKNOWN_FILE_ERROR } from "./errors/index.js";

async function fread(fileHandle) {
  const messageId = sysCall("fread", fileHandle);

  const result = await listen(messageId);

  if (result === 1) return FILE_DESCRIPTOR_DOES_NOT_EXIST;
  if (result === 2) return FILE_LOCKED;
  if (result === 3) return UNKNOWN_FILE_ERROR;

  return result;
}

export default fread;
