import { Router } from "express";
import javascriptOs from "../../inversify.config";
import FileSystemController from "../controllers/filesystem/FileSystemController";
import IFileSystemController from "../controllers/filesystem/IFileSystemController";
import IRouterConfig from "./IRouterConfig";
import Route from "./Route";
import { AccessMap, Directory, Mkdir, Path } from "@thijmen-os/common";
import { HttpStatus, Response } from "../types/responseType";

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

      res.send(
        new Response<Array<Directory>>({ data: result, status: HttpStatus.ok })
      );
    });
    this._router.get("/openUserFile", (req, res) => {
      const requestedFile = req.query.file as string;

      const result = this._fileSystemController.readFile(requestedFile);

      res.send(new Response<string>({ data: result, status: HttpStatus.ok }));
    });
    this._router.post("/makeDirectory", (req, res) => {
      const body: { props: Mkdir; userId: string; access: AccessMap } =
        req.body;

      const result = this._fileSystemController.makeDirectory(
        body.props,
        body.userId,
        body.access
      );

      res.send(
        new Response<string | null>({
          data: result,
          status: HttpStatus.created,
        })
      );
    });
    this._router.post("/makeFile", (req, res) => {
      const body: { props: Mkdir; userId: string; access: AccessMap } =
        req.body;

      const result = this._fileSystemController.makeFile(
        body.props,
        body.userId,
        body.access
      );

      res.send(
        new Response<string | null>({
          data: result,
          status: HttpStatus.created,
        })
      );
    });

    this._router.post("/removeDirectory", (req, res) => {
      const bodyQuery: { Path: Path } = req.body;

      const result = this._fileSystemController.removeDirectory(bodyQuery.Path);

      res.send(
        new Response<string | null>({
          data: result,
          status: HttpStatus.created,
        })
      );
    });

    return this._router;
  }
}

export default FileSystemRoutes;
