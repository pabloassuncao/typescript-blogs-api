import { Request, Response, Router } from 'express';
import rescue from 'express-rescue';

import userService from '../services/userService';
import utils from '../../utils/utils';

async function listAll(__req: Request, res: Response) {
  const result = await userService.listAll();
  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await userService.findById(+id);
  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function remove(req: Request, res: Response) {
  await userService.remove(res.locals.user);
  res.status(utils.HTTP_OK_NO_CONTENT_STATUS).json().end();
}

const router = Router();

export default router
  .get('/:id', rescue(findById))
  .get('/', rescue(listAll))
  .delete('/me', rescue(remove));
