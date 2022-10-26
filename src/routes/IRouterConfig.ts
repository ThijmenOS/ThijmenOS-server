import { Router } from "express";

export default interface IRouterConfig {
  get routes(): Router;
}
