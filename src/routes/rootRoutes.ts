import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import { response } from "../types/responseType";

class RootRoutes extends Route implements IRouterConfig {
  private readonly _fileSystemController: IFileSystemController =
    javascriptOs.resolve(FileSystemController);

  constructor() {
    super();
  }

  get routes(): Router {
    this._router.get("/readRegisteredApplications", (req, res) => {
      const rawFile = this._fileSystemController.readFile(
        "C/OperatingSystem/ThijmenOSdata/applications.json"
      )!;

      const response: response = {
        data: JSON.parse(rawFile),
        status: 200,
      };

      res.send(response);
    });

    this._router.get("/readSettings", (req, res) => {
      const rawFile = this._fileSystemController.readFile(
        "C/OperatingSystem/ThijmenOSdata/settings.json"
      )!;

      const response: response = {
        data: JSON.parse(rawFile),
        status: 200,
      };

      res.send(response);
    });
    this._router.get("/changeDirectory", (req, res) => {
      const result = this._fileSystemController.dirExists(
        req.query.path as string
      );

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });

    return this._router;
  }
}

export default RootRoutes;
