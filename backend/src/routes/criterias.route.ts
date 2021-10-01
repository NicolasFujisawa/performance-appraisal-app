import CriteriasController from '@/controllers/criterias.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class CriteriasRoute implements Routes {
  public path = '/criterias';
  public router = Router();
  public controller = new CriteriasController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.controller.findAll);
  }
}

export default CriteriasRoute;
