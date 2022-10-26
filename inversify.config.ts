import "reflect-metadata";
import { Container } from "inversify";
import types from "./src/types/types";
import FileSystemController from "./src/controllers/filesystem/FileSystemController";
import IFileSystemController from "./src/controllers/filesystem/IFileSystemController";
import FileSystemRoutes from "./src/routes/fileSystemRoutes";
import RootRoutes from "./src/routes/rootRoutes";

const javascriptOs = new Container();
javascriptOs
  .bind<IFileSystemController>(types.FileSystem)
  .to(FileSystemController)
  .inSingletonScope();

export default javascriptOs;
