export default interface IFileSystemController {
  computeTargetDir(dir: string): string;
  getFilesInDir(dir: string): any;
  readFile(dir: string): any;
  dirExists(dir: string): string;
}
