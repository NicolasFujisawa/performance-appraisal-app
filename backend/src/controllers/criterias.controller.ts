import { CreateCriteriaDto } from '@/dtos/create.criteria.dto';
import { Criteria } from '@/entity/criteria.entity';
import CriteriasService from '@/services/criterias.service';
import { NextFunction, Request, Response } from 'express';

class CriteriasController {
  public criteriaService = new CriteriasService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const criterias: Criteria[] = await this.criteriaService.findAll();
      res.status(200).json({ data: criterias });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateCriteriaDto = req.body;
      const criteria: Criteria = await this.criteriaService.create(payload);
      res.status(200).json({ data: criteria });
    } catch (error) {
      next(error);
    }
  };
}

export default CriteriasController;
