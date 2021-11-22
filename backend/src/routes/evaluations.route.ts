import EvaluationsController from '@controllers/evaluations.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class EvaluationsRoute implements Routes {
  public path = '/evaluations';
  public router = Router();
  public controller = new EvaluationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:evaluationId(\\d+)/not-evaluated-students/:studentId(\\d+)`, this.controller.findNotEvaluatedStudents);
    this.router.get(`${this.path}/team/:team(\\d+)`, this.controller.getByTeam);
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getById);
    this.router.post(`${this.path}`, this.controller.create);
  }
}

export default EvaluationsRoute;
