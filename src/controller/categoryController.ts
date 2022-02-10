import { NextFunction, Request, Response } from "express";

import { Router } from 'express';
import rescue from 'express-rescue';

import categoryService from '../services/categoryService';
import utils from '../../utils/utils';

async function validate(req: Request, __res: Response, next: NextFunction) {
  const { name } = req.body;
  await categoryService.validate(name);
  next();
}

async function create(req: Request, res: Response) {
  const { name } = req.body;
  console.log(name, 'controllers/categoryController.js');
  const result = await categoryService.create(name);
  res.status(utils.HTTP_CREATED_STATUS).json(result).end();
}

async function listAll(__req: Request, res: Response) {
  const result = await categoryService.listAll();
  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router = Router();

export default router
  .post('/', rescue(validate), rescue(create))
  .get('/', rescue(listAll));
