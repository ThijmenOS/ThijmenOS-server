import { Router } from "express";
import javascriptOs from "../../inversify.config";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { Mkdir, Path } from "@thijmen-os/common";
import { response } from "../types/responseType";

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

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });
    this._router.get("/openUserFile", (req, res) => {
      const requestedFile = req.query.file as string;

      const result = this._fileSystemController.readFile(requestedFile);

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });
    this._router.post("/makeDirectory", (req, res) => {
      const bodyQuery: Mkdir = req.body;

      const result = this._fileSystemController.makeDirectory(bodyQuery);

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });
    this._router.post("/makeFile", (req, res) => {
      const bodyQuery: Mkdir = req.body;
      const result = this._fileSystemController.makeFile(bodyQuery);

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });

    this._router.post("/removeDirectory", (req, res) => {
      const bodyQuery: { Path: Path } = req.body;

      const result = this._fileSystemController.removeDirectory(bodyQuery.Path);

      const response: response = {
        data: result,
        status: 200,
      };

      res.send(response);
    });

    return this._router;
  }
}

export default FileSystemRoutes;
