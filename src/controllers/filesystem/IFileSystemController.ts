import { Directory, Mkdir, Path } from "@thijmen-os/common";

export default interface IFileSystemController {
  getFilesInDir(dir: string): Array<Directory>;
  readFile(dir: string): string;
  dirExists(dir: string): string;
  makeDirectory(props: Mkdir): string | null;
  removeDirectory(props: Path): string | null;
  makeFile(props: Mkdir): string | null;
}
