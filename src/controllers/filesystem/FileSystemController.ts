import path from "path";
import fs from "fs";
import { injectable } from "inversify";
import IFileSystemController from "./IFileSystemController";
import { Directory, Mkdir, Path } from "@thijmenos/common";

import { computeTargetDir } from "../helpers/computeTargetDir";

@injectable()
class FileSystemController implements IFileSystemController {
  public getFilesInDir(dir: string): Array<Directory> {
    const targetDir = computeTargetDir(dir);

    const files = fs.readdirSync(targetDir);
    const ret = new Array<Directory>();

    files.forEach((file) =>
      ret.push({
        filePath: dir + "/" + file,
        isDir: fs.lstatSync(path.join(targetDir, file)).isDirectory()
          ? true
          : false,
      })
    );

    return ret;
  }

  public readFile(dir: string): string {
    const targetFile = computeTargetDir(dir);

    return fs.readFileSync(targetFile, "utf8");
  }

  public dirExists(dir: string): string {
    const targetDir = computeTargetDir(dir);
    const normalised = path.normalize(targetDir);
    if (!fs.existsSync(normalised)) return "non-existant";

    const cleaned = normalised.split("\\");
    cleaned.shift();

    if (cleaned.at(-1) === "") cleaned.pop();
    if (cleaned.length <= 0) return "non-existant";

    return cleaned.join("/");
  }

  public makeDirectory(props: Mkdir): string | null {
    const targetDir = computeTargetDir(props.directoryPath);
    console.log(props);

    if (fs.existsSync(targetDir)) {
      const newDir = targetDir + "/" + props.name;
      if (fs.existsSync(newDir)) return "Directory already exists!";

      fs.mkdirSync(newDir, { recursive: true });
      return null;
    }

    return "Something went wrong";
  }
  public makeFile(props: Mkdir): string | null {
    const targetDir = computeTargetDir(props.directoryPath);

    if (fs.existsSync(targetDir)) {
      const newFile = targetDir + "/" + props.name;
      if (fs.existsSync(newFile)) return "File already exists";

      fs.openSync(newFile, "w");
      return null;
    }

    return "Something went wrong";
  }

  public removeDirectory(props: Path): string | null {
    const targetDir = computeTargetDir(props);

    console.log(targetDir);

    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true });
      return null;
    }

    return "Provided directory does not exist";
  }
}

export default FileSystemController;
