import * as OS from "../../bin/rm.js";
import argumentParser from "./argParsers/--parser.js";

async function rm(args, term) {
  const path = argumentParser(args);

  if (!path) {
    throw new Error("path is not defined");
  }

  const targetPath =
    path[0] === "/" ? path : term.global.get_var("path") + "/" + path;

  const result = await OS.default(targetPath);
  if (result == 0) {
    term.echo("file removed");
  } else {
    throw new Error("file could not be removed");
  }
}

export default rm;
