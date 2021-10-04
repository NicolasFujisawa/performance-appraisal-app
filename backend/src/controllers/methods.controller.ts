import { Method } from '@/entity/method.entity';
import MethodsService from '@/services/methods.service';
import { NextFunction, Request, Response } from 'express';

class MethodsController {
  public methodService = new MethodsService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const methods: Method[] = await this.methodService.findAll();
      res.status(200).json({ data: methods });
    } catch (error) {
      next(error);
    }
  };
}

export default MethodsController;
