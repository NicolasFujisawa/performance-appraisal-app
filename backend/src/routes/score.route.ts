import ScoreController from '@controllers/scores.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ScoreRoute implements Routes {
  public path = '/scores';
  public router = Router();
  public controller = new ScoreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/evaluation/:evaluation(\\d+)`, this.controller.findByEvaluation);
    this.router.post(`${this.path}`, this.controller.create);
  }
}

export default ScoreRoute;
