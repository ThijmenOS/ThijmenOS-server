import * as OS from "../../bin/mkdir.js";
import argumentParser from "./argParsers/--parser.js";

async function touch(args, term) {
  const path = argumentParser(args);

  if (!path) {
    throw new Error("path is not defined");
  }

  let targetPath;
  let name;
  if (path[0] == "/") {
    const segments = path.split("/");
    name = segments.pop();
    targetPath = segments.join("/");
  } else {
    targetPath = term.global.get_var("path");
    name = path;
  }

  const result = await OS.default(targetPath, name);
  if (result == 0) {
    term.echo(`directory with name: ${name} has been created`);
  } else {
    throw new Error("directory could not be created");
  }
}

export default touch;
