import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const newToken = await this.authService.refreshToken(token!);
      res.json({ token: newToken });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}