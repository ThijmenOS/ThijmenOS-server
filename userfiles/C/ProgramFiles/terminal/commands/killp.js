import * as OS from "../../bin/killp.js";
import argumentParser from "./argParsers/--parser.js";

async function killp(args, term) {
  const pid = argumentParser(args);

  if (!pid) {
    throw new Error("pid is not defined");
  }

  const result = await OS.default(Number(pid));
  if (result == 0) {
    term.echo(`Processes with pid: ${pid} has been terminated`);
  } else {
    throw new Error("Process could not be terminated");
  }
}

export default killp;
