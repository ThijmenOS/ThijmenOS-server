import { Router } from "express";
import javascriptOs from "../../inversify.config";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { Mkdir, Path } from "@thijmenos/common";

class FileSystemRoutes extends Route implements IRouterConfig {
  private readonly _fileSystemController: IFileSystemController =
    javascriptOs.resolve(FileSystemController);

  constructor() {
    super();
  }

  public get routes(): Router {
    this._router.get("/showUserFiles", (req, res) => {
      const requestedDir: string = (req.query.dir as string) || "";

      const result = this._fileSystemController.getFilesInDir(requestedDir);

      res.send(result);
    });
    this._router.get("/openUserFile", (req, res) => {
      const requestedFile = req.query.file as string;

      const result = this._fileSystemController.readFile(requestedFile);

      res.send(result);
    });
    this._router.post("/makeDirectory", (req, res) => {
      const bodyQuery: Mkdir = req.body;

      const result = this._fileSystemController.makeDirectory(bodyQuery);

      res.send(result);
    });
    this._router.post("/makeFile", (req, res) => {
      const bodyQuery: Mkdir = req.body;
      this._fileSystemController.makeFile(bodyQuery);

      res.sendStatus(200);
    });

    this._router.post("/removeDirectory", (req, res) => {
      const bodyQuery: { Path: Path } = req.body;

      const result = this._fileSystemController.removeDirectory(bodyQuery.Path);

      res.send(result);
    });

    return this._router;
  }
}

export default FileSystemRoutes;
