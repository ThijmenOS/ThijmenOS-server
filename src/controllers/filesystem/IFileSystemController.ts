import { Mkdir, Path } from "javascriptos-common/types";

export default interface IFileSystemController {
  getFilesInDir(dir: string): any;
  readFile(dir: string): any;
  dirExists(dir: string): string;
  makeDirectory(props: Mkdir): string | null;
  removeDirectory(props: Path): string | null;
  makeFile(props: Mkdir): string | null;
}
