import { CreateScoreDto } from '@/dtos/create.score.dto';
import { Score } from '@/entity/score.entity';
import ScoreService from '@/services/scores.service';
import { NextFunction, Request, Response } from 'express';

class ScoreController {
  public service = new ScoreService();

  public findByEvaluationAndEvaluatedStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const evaluationId = Number(req.params.evaluation);
      const evaluatedStudentId = Number(req.params.evaluatedStudent);
      const scores: Score[] = await this.service.findByEvaluationAndEvaluatedStudent(evaluationId, evaluatedStudentId);

      res.status(200).json({ data: scores });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateScoreDto[] = req.body;
      const createdData = await this.service.createBulk(payload);

      res.status(201).json({ data: createdData });
    } catch (error) {
      next(error);
    }
  };
}

export default ScoreController;
