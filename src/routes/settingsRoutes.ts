import { Path, PermissionRequestDto } from "@thijmen-os/common";
import ISettingsController from "../controllers/settings/ISettingsController";
import SettingsController from "../controllers/settings/SettingsController";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { response } from "types/responseType";

class SettingsRoutes extends Route implements IRouterConfig {
  private readonly _settingsController: ISettingsController =
    javascriptOs.resolve(SettingsController);

  constructor() {
    super();
  }

  public get routes(): Router {
    this._router.post("/setBackground", async (req, res) => {
      const filePath: { Path: Path } = req.body;

      await this._settingsController.SetBackground(filePath.Path);

      const background = await this._settingsController.GetBackground();

      const response: response = {
        data: background,
        status: 200,
      };

      res.send(response);
    });
    this._router.get("/getBackground", async (req, res) => {
      const result = await this._settingsController.GetBackground();

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });
    this._router.post("/grantPermission", async (req, res) => {
      const reqbody: PermissionRequestDto = req.body;

      const result = await this._settingsController.GrantPermission(reqbody);

      const response: response = {
        data: result,
        status: 200,
      };

      if (!result) response.status = 404;

      res.send(response);
    });
    this._router.delete("/grantPermission", async (req, res) => {
      const reqbody: PermissionRequestDto = req.body;

      const result = await this._settingsController.RevokePermission(reqbody);

      const response: response = {
        data: result,
        status: 204,
      };

      if (!result) response.status = 404;

      res.send(response);
    });
    this._router.delete("/allPermissions", async (req, res) => {
      const applicationId: { applicationId: string } = req.body;

      const result = await this._settingsController.RevokeAllPermissions(
        applicationId.applicationId
      );

      const response: response = {
        data: result,
        status: 204,
      };

      if (!result) response.status = 404;

      res.send(response);
    });

    return this._router;
  }
}

export default SettingsRoutes;
