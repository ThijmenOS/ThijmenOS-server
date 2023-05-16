import * as OS from "../../bin/waitpid.js";
import argumentParser from "./argParsers/--parser.js";

async function waitpid(args, term) {
  const pid = argumentParser(args);
  if (!pid) {
    throw new Error("required parameter pid does not exist");
  }

  const result = await OS.default(Number(pid));

  term.echo(result);
}

export default waitpid;
