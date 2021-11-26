import LgpdService from '@/services/lgpd.service';
import { NextFunction, Request, Response } from 'express';

class LgpdController {
  public lgpdService = new LgpdService();

  public data = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.query.userId);
      const data = await this.lgpdService.dataByUser(userId);
      res.header('Content-Type', 'text/plain').header('Content-Disposition', `attachment; filename="data-user-${userId}.txt"`).status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default LgpdController;
