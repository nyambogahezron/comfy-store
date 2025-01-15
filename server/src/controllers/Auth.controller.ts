import { Request, Response } from 'express';

export async function RegisterUser(req: Request, res: Response) {
  res.send('Register User');
}

export async function LoginUser(req: Request, res: Response) {
  res.send('Login User');
}

export async function LogoutUser(req: Request, res: Response) {
  res.send('Logout User');
}
