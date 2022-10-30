import { Mkdir, Path } from "@common/FileSystem";

export default interface IFileSystemController {
  computeTargetDir(dir: string): string;
  getFilesInDir(dir: string): any;
  readFile(dir: string): any;
  dirExists(dir: string): string;
  makeDirectory(props: Mkdir): string | null;
  removeDirectory(props: Path): string | null;
  makeFile(props: Mkdir): string | null;
}
