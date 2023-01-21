import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import { HttpStatus, Response } from "../types/responseType";
import ISettingsController from "../controllers/settings/ISettingsController";
import SettingsController from "../controllers/settings/SettingsController";
import { OSSettings, User } from "@thijmen-os/common";

class RootRoutes extends Route implements IRouterConfig {
  private readonly _fileSystemController: IFileSystemController =
    javascriptOs.resolve(FileSystemController);
  private readonly _settingsController: ISettingsController =
    javascriptOs.resolve(SettingsController);

  constructor() {
    super();
  }

  get routes(): Router {
    this._router.get("/readSettings", (req, res) => {
      const rawFile = this._fileSystemController.readFile(
        "C/OperatingSystem/ThijmenOsData/settings.json"
      )!;

      res.send(
        new Response<OSSettings>({
          data: JSON.parse(rawFile),
          status: HttpStatus.ok,
        })
      );
    });

    this._router.get("/changeDirectory", (req, res) => {
      const result = this._fileSystemController.dirExists(
        req.query.path as string
      );

      res.send(new Response<string>({ data: result, status: HttpStatus.ok }));
    });

    this._router.get("/users", async (req, res) => {
      const result = await this._settingsController.GetAllUsers();

      res.send(
        new Response<Array<User>>({ data: result, status: HttpStatus.ok })
      );
    });

    return this._router;
  }
}

export default RootRoutes;
