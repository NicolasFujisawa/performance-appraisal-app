import TeamsController from '@/controllers/teams.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class TeamsRoute implements Routes {
  public path = '/teams';
  public router = Router();
  public controller = new TeamsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/join`, this.controller.joinTeam);
    this.router.post(`${this.path}/`, this.controller.create);
    this.router.get(`${this.path}/`, this.controller.findAll);
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getTeamById);
  }
}

export default TeamsRoute;
