import LgpdController from '@/controllers/lgpd.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class LgpdRoute implements Routes {
  public path = '/lgpd';
  public router = Router();
  public controller = new LgpdController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/data`, this.controller.data);
  }
}

export default LgpdRoute;
