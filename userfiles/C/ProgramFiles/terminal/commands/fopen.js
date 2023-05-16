import * as OS from "../../bin/fopen.js";
import argumentParser from "./argParsers/--parser.js";

async function fOpen(args, term) {
  const parsedArgs = argumentParser(args);
  if (!parsedArgs) throw new Error("No argements specified");

  const targetPath =
    parsedArgs[0] === "/"
      ? parsedArgs
      : term.global.get_var("path") + "/" + parsedArgs;

  const mimetype = parsedArgs.split(".").at(-1);
  const result = OS.default(targetPath, mimetype);
  term.echo(result);
}

export default fOpen;
