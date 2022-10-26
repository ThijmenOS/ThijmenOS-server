import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import FileSystemController from "../controllers/filesystem/FileSystemController";

class RootRoutes extends Route implements IRouterConfig {
  private readonly _fileSystemController: IFileSystemController =
    javascriptOs.resolve(FileSystemController);

  constructor() {
    super();
  }

  get routes(): Router {
    this._router.get("/readRegisteredApplications", (req, res) => {
      let rawFile = this._fileSystemController.readFile(
        "C/OperatingSystem/ThijmenOSdata/applications.json"
      )!;
      res.send(JSON.parse(rawFile));
    });

    this._router.get("/readSettings", (req, res) => {
      let rawFile = this._fileSystemController.readFile(
        "C/OperatingSystem/ThijmenOSdata/settings.json"
      )!;
      res.send(JSON.parse(rawFile));
    });
    this._router.get("/changeDirectory", (req, res) => {
      let result = this._fileSystemController.dirExists(
        req.query.path as string
      );
      res.send(result);
    });

    return this._router;
  }
}

export default RootRoutes;
