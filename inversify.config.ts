import "reflect-metadata";
import { Container } from "inversify";
import types from "./src/types/types";
import FileSystemController from "./src/controllers/filesystem/FileSystemController";
import IFileSystemController from "./src/controllers/filesystem/IFileSystemController";
import ISettingsController from "./src/controllers/settings/ISettingsController";
import SettingsController from "./src/controllers/settings/SettingsController";
import RootMethods from "./src/controllers/root/rootMethods";
import Root from "./src/controllers/root/root";

const javascriptOs = new Container();
javascriptOs
  .bind<IFileSystemController>(types.FileSystem)
  .to(FileSystemController)
  .inSingletonScope();
javascriptOs
  .bind<ISettingsController>(types.Settings)
  .to(SettingsController)
  .inSingletonScope();
javascriptOs.bind<RootMethods>(types.Root).to(Root).inSingletonScope();

export default javascriptOs;
