import { AccessMap, Directory, Mkdir, Path } from "@thijmen-os/common";

export default interface IFileSystemController {
  getFilesInDir(dir: string): Array<Directory>;
  readFile(dir: string): string | number;
  dirExists(dir: string): number | string;
  makeDirectory(
    props: Mkdir,
    subjectId: string,
    accessLevels: AccessMap
  ): string | null;
  removeDirectory(props: Path): boolean;
  makeFile(
    props: Mkdir,
    subjectId: string,
    accessLevels: AccessMap
  ): string | null;
}
