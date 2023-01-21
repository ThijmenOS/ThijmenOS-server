import { Path, PermissionRequestDto } from "@thijmen-os/common";
import ISettingsController from "../controllers/settings/ISettingsController";
import SettingsController from "../controllers/settings/SettingsController";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { HttpStatus, Response } from "../types/responseType";

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

      res.send(
        new Response<string>({ data: background, status: HttpStatus.created })
      );
    });
    this._router.get("/getBackground", async (req, res) => {
      const result = await this._settingsController.GetBackground();

      res.send(new Response<string>({ data: result, status: HttpStatus.ok }));
    });
    this._router.post("/grantPermission", async (req, res) => {
      const reqbody: PermissionRequestDto = req.body;
      const result = await this._settingsController.GrantPermission(reqbody);

      const response = new Response<boolean>({
        data: result,
        status: HttpStatus.created,
      });

      if (!result) response.status = HttpStatus.notFound;

      res.send(response);
    });
    this._router.delete("/grantPermission", async (req, res) => {
      const reqbody: PermissionRequestDto = req.body;

      const result = await this._settingsController.RevokePermission(reqbody);

      const response = new Response<boolean>({
        data: result,
        status: HttpStatus.ok,
      });

      if (!result) response.status = HttpStatus.notFound;

      res.send(response);
    });
    this._router.delete("/allPermissions", async (req, res) => {
      const applicationId: { applicationId: string } = req.body;

      const result = await this._settingsController.RevokeAllPermissions(
        applicationId.applicationId
      );

      const response = new Response<boolean>({
        data: result,
        status: HttpStatus.noContent,
      });

      if (!result) response.status = HttpStatus.notFound;

      res.send(response);
    });

    return this._router;
  }
}

export default SettingsRoutes;
