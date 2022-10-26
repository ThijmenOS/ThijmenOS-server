import path from "path";
import fs from "fs";
import { injectable } from "inversify";
import IFileSystemController from "./IFileSystemController";

@injectable()
class FileSystemController implements IFileSystemController {
  private readonly baseDir: string = "userfiles\\";

  public computeTargetDir(dir: string): string {
    let targetDir = path.join(this.baseDir, dir);

    if (targetDir.indexOf(this.baseDir) !== 0) {
      return "";
    }

    return targetDir;
  }

  public getFilesInDir(dir: string) {
    let targetDir = this.computeTargetDir(dir);

    let files = fs.readdirSync(targetDir);
    let ret = new Array<any>();

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

  public readFile(dir: string) {
    let targetFile = this.computeTargetDir(dir);

    return fs.readFileSync(targetFile, "utf8");
  }

  public dirExists(dir: string): string {
    let targetDir = this.computeTargetDir(dir);
    let normalised = path.normalize(targetDir);
    if (!fs.existsSync(normalised)) return "non-existant";

    let cleaned = normalised.split("\\");
    cleaned.shift();

    if (cleaned.at(-1) == "") cleaned.pop();
    if (cleaned.length <= 0) return "non-existant";

    return cleaned.join("/") + "/";
  }
}

export default FileSystemController;
