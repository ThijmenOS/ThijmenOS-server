import * as OS from "../../bin/cd.js";
import argumentParser from "./argParsers/--parser.js";

async function cd(args, term) {
  const parsedArgs = argumentParser(args);
  if (!parsedArgs) throw new Error("no path specified");

  const targetPath =
    parsedArgs[0] === "/"
      ? parsedArgs
      : term.global.get_var("path") + "/" + parsedArgs;

  const result = await OS.default(targetPath);

  if (result === -1)
    throw new Error(`target path: ${targetPath} does not exist`);

  term.global.set_var("path", result);
  term.set_prompt(`${result}>`);
}

export default cd;
