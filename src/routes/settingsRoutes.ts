import { Path } from "@thijmenos/common/types";
import ISettingsController from "../controllers/settings/ISettingsController";
import SettingsController from "../controllers/settings/SettingsController";
import { Router } from "express";
import javascriptOs from "../../inversify.config";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";

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

      res.send(background);
    });
    this._router.get("/getBackground", async (req, res) => {
      const result = await this._settingsController.GetBackground();

      res.send(result);
    });

    return this._router;
  }
}

export default SettingsRoutes;
