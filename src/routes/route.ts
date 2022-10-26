import express, { Router } from "express";

abstract class Route {
  protected readonly _router: Router;

  constructor() {
    this._router = express.Router();
  }
}

export default Route;
