import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../../utils/utils';

async function authController(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: MESSAGES.TOKEN_NOT_FOUND }).end();
  }

  if(!process.env.JWT_SECRET) {
    return res.status(500).json({ message: MESSAGES.TOKEN_INVALID }).end();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: MESSAGES.TOKEN_INVALID });
  }
}

export default authController;
