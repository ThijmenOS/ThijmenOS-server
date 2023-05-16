import * as OS from "../../bin/pstart.js";
import argumentParser from "./argParsers/--parser.js";

async function pstart(args, term) {
  if (!args) {
    throw new Error("No arguments where specified");
  }

  const path = args.shift();
  if (path[0] === "-") {
    throw new Error("No valid path argument provided");
  }

  const targetPath =
    path === "/" ? path : term.global.get_var("path") + "/" + path;

  const result = await OS.default(targetPath, args.join(" "));
  if (result === -1) {
    throw new Error("could not start process");
  }

  term.echo(`process started with pid: ${result}`);
}
export default pstart;
