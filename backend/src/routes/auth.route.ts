import AuthController from '@controllers/auth.controller';
import { UserLoginDto } from '@dtos/user.login.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(UserLoginDto, 'body'), this.authController.logIn);
  }
}

export default AuthRoute;
