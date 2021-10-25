import { UserLoginDto } from '@/dtos/user.login.dto';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserLoginDto = req.body;
      const data = await this.authService.login(userData);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
