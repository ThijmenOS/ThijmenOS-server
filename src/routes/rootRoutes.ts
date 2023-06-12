import IRouterConfig from "./IRouterConfig";
import Route from "./route";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import { HttpStatus, Response } from "../types/responseType";
import ISettingsController from "../controllers/settings/ISettingsController";
import SettingsController from "../controllers/settings/SettingsController";
import Root from "../controllers/root/root";
import { Accounts, OSSettings } from "@thijmen-os/common";
import RootMethods from "../controllers/root/rootMethods";
import { AccessObjectMap } from "@thijmen-os/common";

class RootRoutes extends Route implements IRouterConfig {
  private readonly _fileSystemController: IFileSystemController =
    javascriptOs.resolve(FileSystemController);
  private readonly _settingsController: ISettingsController =
    javascriptOs.resolve(SettingsController);
  private readonly _RootController: RootMethods = javascriptOs.resolve(Root);

  constructor() {
    super();
  }

  get routes(): Router {
    this._router.get("/readSettings", (req, res) => {
      const rawFile = this._fileSystemController.readFile(
        "C/OperatingSystem/ThijmenOsData/settings.json"
      )!;

      if (typeof rawFile === "number") {
        return;
      }

      res.send(
        new Response<OSSettings>({
          data: JSON.parse(rawFile),
          status: HttpStatus.ok,
        })
      );
    });

    this._router.get("/users", async (req, res) => {
      const result = await this._settingsController.GetAllUsers();

      res.send(new Response<Accounts>({ data: result, status: HttpStatus.ok }));
    });

    this._router.get("/access", async (req, res) => {
      const result = this._RootController.readFileAccess();

      res.send(
        new Response<AccessObjectMap>({
          data: result,
          status: HttpStatus.ok,
        })
      );
    });

    return this._router;
  }
}

export default RootRoutes;
