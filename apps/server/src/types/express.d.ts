import express from 'express';
import { UserProps } from '.';

declare global {
  namespace Express {
    interface Request {
      secret?: string;
      user?: UserProps;
    }
  }
}
