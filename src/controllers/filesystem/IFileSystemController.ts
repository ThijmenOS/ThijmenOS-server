import { AccessMap, Directory, Mkdir, Path } from "@thijmen-os/common";

export default interface IFileSystemController {
  getFilesInDir(dir: string): Array<Directory>;
  open(path: string): string | false;
  readFile(dir: string): string | number;
  dirExists(dir: string): number | string;
  pathExists(path: string): number | string;
  makeDirectory(
    props: Mkdir,
    subjectId: string,
    accessLevels: AccessMap
  ): string | null;
  removeDirectory(props: Path): Promise<boolean>;
  makeFile(
    props: Mkdir,
    subjectId: string,
    accessLevels: AccessMap
  ): string | null;
  removeFile(props: Path): Promise<boolean>;
  writeFile(path: Path, content: string): boolean;
}
