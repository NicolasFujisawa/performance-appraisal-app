import { CreateTeamDto } from '@/dtos/create.team.dto';
import { JoinTeamDto } from '@/dtos/join.team.dto';
import { Team } from '@/entity/team.entity';
import TeamsService from '@/services/teams.service';
import { NextFunction, Request, Response } from 'express';

class TeamsController {
  public teamsService = new TeamsService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateTeamDto = req.body;
      const team: Team = await this.teamsService.create(payload);
      res.status(200).json({ data: team });
    } catch (error) {
      next(error);
    }
  };

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams: Team[] = await this.teamsService.findAll();
      res.status(200).json({ data: teams });
    } catch (error) {
      next(error);
    }
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teamId = Number(req.params.id);
      const findOneTeamData: Team = await this.teamsService.findTeamById(teamId);

      res.status(200).json({ data: findOneTeamData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public joinTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: JoinTeamDto = req.body;
      await this.teamsService.joinTeam(body);

      res.status(201).json({ message: 'Success' });
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;
