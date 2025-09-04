import { Request, Response } from 'express';

export default function NotFoundHandler(req: Request, res: Response) {
  res.status(404).send(`Route Not Found - ${req.originalUrl}`);
}
