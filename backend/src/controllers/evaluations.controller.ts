import { CreateEvaluationDto } from '@/dtos/create.evaluation.dto';
import { Evaluation } from '@entity/evaluation.entity';
import EvaluationService from '@services/evaluations.service';
import { NextFunction, Request, Response } from 'express';

class EvaluationsController {
  public evaluationService = new EvaluationService();

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const evaluationId = Number(req.params.id);
      const evaluation: Evaluation = await this.evaluationService.findById(evaluationId, true);

      res.status(200).json({ data: evaluation });
    } catch (error) {
      next(error);
    }
  };

  public getByTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teamId = Number(req.params.team);
      const evaluations: Evaluation[] = await this.evaluationService.findByTeam(teamId, true);

      res.status(200).json({ data: evaluations });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateEvaluationDto = req.body;
      const createData: Evaluation = await this.evaluationService.create(payload);

      res.status(201).json({ data: createData });
    } catch (error) {
      next(error);
    }
  };

  public findNotEvaluatedStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { studentId, evaluationId } = req.params;
      const role = req.query.role as string;

      const notEvaluatedStudentsData = await this.evaluationService.findNotEvaluatedStudents({ studentId, evaluationId, role });

      res.status(201).json({ data: notEvaluatedStudentsData });
    } catch (error) {
      next(error);
    }
  };
}

export default EvaluationsController;
