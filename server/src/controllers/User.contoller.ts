import { Request, Response } from 'express';

export async function GetUser(req: Request, res: Response) {
  res.send('Get User');
}

export async function UpdateUser(req: Request, res: Response) {
  res.send('Update User');
}


