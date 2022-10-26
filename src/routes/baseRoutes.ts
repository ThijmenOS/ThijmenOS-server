import express from "express";
import FileSystemRoutes from "./fileSystemRoutes";
import RootRoutes from "./rootRoutes";

export class BaseRoutes {
  app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  public defineRoutes() {
    this.app.use("/filesystem", new FileSystemRoutes().routes);
    this.app.use("/root", new RootRoutes().routes);
  }
}

export default BaseRoutes;
