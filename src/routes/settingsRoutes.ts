import { PermissionRequestDto, User } from "@thijmen-os/common";
import ISettingsController from "../controllers/settings/ISettingsController";
import SettingsController from "../controllers/settings/SettingsController";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IRouterConfig from "./IRouterConfig";
import Route from "./route";
import { HttpStatus, Response } from "../types/responseType";

class SettingsRoutes extends Route implements IRouterConfig {
  private readonly _settingsController: ISettingsController =
    javascriptOs.resolve(SettingsController);

  constructor() {
    super();
  }

  public get routes(): Router {
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
    this._router.post("/user", async (req, res) => {
      const user: User = req.body;

      if (!user) {
        const response = new Response<null>({
          data: null,
          status: HttpStatus.badRequest,
        });

        res.send(response);
      }

      try {
        const result = await this._settingsController.UpdateUserInfo(user);

        res.send(new Response<User>({ data: result, status: HttpStatus.ok }));
      } catch (err) {
        res.send(
          new Response<null>({
            data: null,
            status: HttpStatus.serverError,
          })
        );
      }
    });

    return this._router;
  }
}

export default SettingsRoutes;
