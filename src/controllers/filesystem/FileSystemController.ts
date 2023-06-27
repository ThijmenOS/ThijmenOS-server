import path from "path";
import fs from "fs";
import * as fsasync from "fs/promises";
import { injectable } from "inversify";
import IFileSystemController from "./IFileSystemController";
import { Access, AccessMap, Directory, Mkdir, Path } from "@thijmen-os/common";

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

  public open(path: string): string | false {
    const targetFile = computeTargetDir(path);

    try {
      const fileContent = fs.readFileSync(targetFile, { encoding: "utf-8" });

      return fileContent;
    } catch {
      return false;
    }
  }

  private registerAccess(path: Path, userId: string, access: AccessMap) {
    //TODO: Make this env variable
    //TODO: Implement groups
    const targetFile = computeTargetDir(
      "C/OperatingSystem/ThijmenOSdata/.access"
    );

    const rwx: Array<string> = [];
    Object.keys(access).map((x) =>
      access[x as Access] ? rwx.push(x.toString()) : rwx.push("-")
    );
    const targetPath = path.substring(10).split("\\").join("/");

    const entry = `\n${targetPath}:${userId}${rwx.join("")}:1rwx`;

    fs.appendFileSync(targetFile, entry);
  }

  private async removeFromAccess(path: Path) {
    const targetFile = computeTargetDir(
      "C/OperatingSystem/ThijmenOSdata/.access"
    );

    const accessFileContent: string = fs.readFileSync(targetFile, "utf8");

    const accessFileContentArray = accessFileContent.split("\n");

    const entriesToKeep = accessFileContentArray.filter(
      (x) => !x.includes(path)
    );

    const modifiedEntriesFile: string = entriesToKeep.join("\n");
    fs.writeFileSync(targetFile, modifiedEntriesFile, "utf8");
  }

  public readFile(dir: string): string | number {
    const targetFile = computeTargetDir(dir);

    this.removeFromAccess(dir);

    try {
      const fileContent = fs.readFileSync(targetFile, "utf8");

      return fileContent;
    } catch (err) {
      return -1;
    }
  }

  public dirExists(dir: string): number | string {
    const targetDir = computeTargetDir(dir);
    const normalised = path.normalize(targetDir);
    if (!fs.existsSync(normalised)) return -1;
    if (!fs.lstatSync(normalised).isDirectory()) return -1;

    const cleaned = normalised.split("\\");
    cleaned.shift();

    if (cleaned.at(-1) === "") cleaned.pop();
    if (cleaned.length <= 0) return -1;

    return cleaned.join("/");
  }

  public pathExists(dir: string): number | string {
    const targetDir = computeTargetDir(dir);
    const normalised = path.normalize(targetDir);

    if (!fs.existsSync(normalised)) return -1;

    const cleaned = normalised.split("\\");
    cleaned.shift();

    if (cleaned.at(-1) === "") cleaned.pop();
    if (cleaned.length <= 0) return -1;

    return cleaned.join("/");
  }

  public makeDirectory(
    props: Mkdir,
    subjectId: string,
    accessLevels: AccessMap
  ): string | null {
    const targetDir = computeTargetDir(props.directoryPath);

    if (fs.existsSync(targetDir)) {
      const newDir = targetDir + "/" + props.name;
      if (fs.existsSync(newDir)) return "Directory already exists!";

      fs.mkdirSync(newDir, { recursive: true });
      this.registerAccess(newDir, subjectId, accessLevels);

      return null;
    }

    return "Something went wrong";
  }
  public makeFile(
    props: Mkdir,
    subjectId: string,
    accessLevels: AccessMap
  ): string | null {
    const targetDir = computeTargetDir(props.directoryPath);

    if (fs.existsSync(targetDir)) {
      const newFile = targetDir + "/" + props.name;
      if (fs.existsSync(newFile)) return "File already exists";

      fs.openSync(newFile, "w");
      this.registerAccess(newFile, subjectId, accessLevels);

      return null;
    }

    return "Something went wrong";
  }

  public async removeDirectory(props: Path): Promise<boolean> {
    const targetDir = computeTargetDir(props);

    if (!fs.existsSync(targetDir)) {
      return false;
    }

    try {
      await fsasync.rmdir(targetDir, { recursive: true });
      this.removeFromAccess(props);
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  public async removeFile(props: Path): Promise<boolean> {
    const targetPath = computeTargetDir(props);

    if (!fs.existsSync(targetPath)) {
      return false;
    }

    try {
      const isDir = fs.lstatSync(targetPath).isDirectory();

      if (isDir) {
        fsasync.rm(targetPath, { recursive: true, force: true });
      } else {
        await fsasync.unlink(targetPath);
      }
      this.removeFromAccess(props);
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  public writeFile(path: Path, content: string): boolean {
    const targetDir = computeTargetDir(path);

    if (!fs.existsSync(targetDir)) {
      return false;
    }

    try {
      fs.writeFileSync(targetDir, content);
    } catch (err) {
      return false;
    }

    return true;
  }
}

export default FileSystemController;
