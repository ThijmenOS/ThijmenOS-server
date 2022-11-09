import { Router } from "express";
import javascriptOs from "../../inversify.config";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { Mkdir, Path } from "@thijmenos/common/types";

class FileSystemRoutes extends Route implements IRouterConfig {
  private readonly _fileSystemController: IFileSystemController =
    javascriptOs.resolve(FileSystemController);

  constructor() {
    super();
  }

  public get routes(): Router {
    this._router.get("/showUserFiles", (req, res) => {
      let requestedDir: string = (req.query.dir as string) || "";

      let result = this._fileSystemController.getFilesInDir(requestedDir);

      res.send(result);
    });
    this._router.get("/openUserFile", (req, res) => {
      let requestedFile = req.query.file as string;

      let result = this._fileSystemController.readFile(requestedFile);

      res.send(result);
    });
    this._router.post("/makeDirectory", (req, res) => {
      let bodyQuery: Mkdir = req.body;

      let result = this._fileSystemController.makeDirectory(bodyQuery);

      res.send(result);
    });
    this._router.post("/makeFile", (req, res) => {
      let bodyQuery: Mkdir = req.body;
      let result = this._fileSystemController.makeFile(bodyQuery);

      res.send;
    });

    this._router.post("/removeDirectory", (req, res) => {
      let bodyQuery: { Path: Path } = req.body;

      let result = this._fileSystemController.removeDirectory(bodyQuery.Path);

      res.send(result);
    });

    return this._router;
  }
}

export default FileSystemRoutes;
