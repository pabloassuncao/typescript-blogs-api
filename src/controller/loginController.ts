import { NextFunction, Request, Response, Router } from 'express';
import rescue from 'express-rescue';

import loginService from '../services/loginService';
import utils from '../../utils/utils';

async function validate(req: Request, __res: Response, next: NextFunction) {
  const loginInfo = req.body;
  await loginService.validate(loginInfo);
  return next();
}

async function login(req: Request, res: Response) {
  const loginInfo = req.body;

  const token = await loginService.login(loginInfo);
  res.status(utils.HTTP_OK_STATUS).json({ token }).end();
}

const router = Router();

export default router
  .post('/', rescue(validate), rescue(login));
