import * as OS from "../../bin/usermod.js";
import argumentParser from "./argParsers/--parser.js";

async function usermod(args, term) {
  const username = argumentParser(args);
  if (!username)
    throw new Error("required parameter 'username' is not defined");

  const result = OS.default(username);
  term.echo(result);
}

export default usermod;
