import MethodsController from '@/controllers/methods.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class MethodsRoute implements Routes {
  public path = '/methods';
  public router = Router();
  public controller = new MethodsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.controller.findAll);
  }
}

export default MethodsRoute;
