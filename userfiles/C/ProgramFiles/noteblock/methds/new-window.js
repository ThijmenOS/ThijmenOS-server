import { pstart } from "../../bin/index.js";

export async function LaunchNewWindow() {
  await pstart("C/ProgramFiles/noteblock/index.html");
}
