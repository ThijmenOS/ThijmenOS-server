import * as OS from "../../bin/readFile.js";
import argumentParser from "./argParsers/--parser.js";

async function cat(args, term) {
  const parsedArgs = argumentParser(args);
  if (!parsedArgs) throw new Error("no file specified");

  const targetPath =
    parsedArgs[0] === "/"
      ? parsedArgs
      : term.global.get_var("path") + "/" + parsedArgs;

  const result = await OS.default(targetPath);
  if (result == -1)
    throw new Error("target file does not exist or could not be openend");

  term.echo(result);
}

export default cat;
