import { CreateMethodDto } from '@/dtos/create.method.dto';
import { Method } from '@/entity/method.entity';
import MethodsService from '@/services/methods.service';
import { NextFunction, Request, Response } from 'express';

class MethodsController {
  public methodsService = new MethodsService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateMethodDto = req.body;
      const method: Method = await this.methodsService.create(payload);
      res.status(200).json({ data: method });
    } catch (error) {
      next(error);
    }
  };
}

export default MethodsController;
