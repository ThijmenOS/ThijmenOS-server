import path from "path";
import fs from "fs";
import { injectable } from "inversify";
import IFileSystemController from "./IFileSystemController";
import { Mkdir, Path } from "@common/FileSystem";

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

    return cleaned.join("/");
  }

  public makeDirectory(props: Mkdir): string | null {
    let targetDir = this.computeTargetDir(props.directoryPath);
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
    let targetDir = this.computeTargetDir(props.directoryPath);

    if (fs.existsSync(targetDir)) {
      const newFile = targetDir + "/" + props.name;
      if (fs.existsSync(newFile)) return "File already exists";

      fs.openSync(newFile, "w");
      return null;
    }

    return "Something went wrong";
  }

  public removeDirectory(props: Path): string | null {
    let targetDir = this.computeTargetDir(props);

    console.log(targetDir);

    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true });
      return null;
    }

    return "Provided directory does not exist";
  }
}

export default FileSystemController;
