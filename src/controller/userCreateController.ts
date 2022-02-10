import { NextFunction, Request, Response } from "express";

import { Router } from 'express';
import rescue from 'express-rescue';

import userService from '../services/userCreateService';
import utils from '../../utils/utils';

async function validate(req: Request, __res: Response, next: NextFunction) {
  const userInfo = req.body;
  await userService.validate(userInfo);
  next();
}

async function create(req: Request, res: Response) {
  const userInfo = req.body;

  const token = await userService.create(userInfo);
  res.status(utils.HTTP_CREATED_STATUS).json({ token }).end();
}

const router = Router();

export default router
  .post('/', rescue(validate), rescue(create));
