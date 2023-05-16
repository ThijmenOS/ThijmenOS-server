import * as OS from "../../bin/ls.js";
import argumentParser from "./argParsers/--parser.js";

async function ls(args, term) {
  const parsedArgs = argumentParser(args);
  let result;
  if (!parsedArgs) {
    result = await OS.default(term.global.get_var("path"));
  } else {
    result = await OS.default(parsedArgs);
  }

  term.echo();

  result.forEach((file) => {
    const fileName = file.filePath.split("/").at(-1);
    let type;
    if (file.isDir) {
      type = "dir";
    } else {
      type = fileName.split(".").at(-1);
    }

    term.echo(`${type}   ${fileName}`);
  });

  term.echo();
}

export default ls;
