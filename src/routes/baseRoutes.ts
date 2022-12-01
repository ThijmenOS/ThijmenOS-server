import express from "express";
import FileSystemRoutes from "./fileSystemRoutes";
import RootRoutes from "./rootRoutes";
import SettingsRoutes from "./settingsRoutes";

export class BaseRoutes {
  private readonly app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  public defineRoutes(): void {
    this.app.use("/filesystem", new FileSystemRoutes().routes);
    this.app.use("/root", new RootRoutes().routes);
    this.app.use("/settings", new SettingsRoutes().routes);
  }
}

export default BaseRoutes;
