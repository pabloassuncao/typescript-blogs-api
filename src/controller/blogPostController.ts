import { NextFunction, Request, Response } from "express";

import { Router } from 'express';
import rescue from 'express-rescue';

import blogPostService from '../services/blogPostService';
import utils from '../../utils/utils';

async function validate(req: Request, __res: Response, next: NextFunction): Promise<void> {
  console.log(req.body);

  const blogPostInfo = req.body;
  await blogPostService.validate(blogPostInfo);
  next();
}

async function create(req: Request, res: Response): Promise<void> {
  const blogPostInfo = req.body;

  const result = await blogPostService.create(blogPostInfo, res.locals.user);
  res.status(utils.HTTP_CREATED_STATUS).json(result).end();
}

async function listAll(__req: Request, res: Response): Promise<void> {
  const result = await blogPostService.listAll();
  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function findById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const result = await blogPostService.findById(+id);

  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const blogPostInfo = req.body;

  const result = await blogPostService
    .update(+id, blogPostInfo, res.locals.user);
  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function remove(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  await blogPostService.remove(+id, res.locals.user);
  res.status(utils.HTTP_OK_NO_CONTENT_STATUS).json().end();
}

async function findByTerm(req: Request, res: Response): Promise<void> {
  const { q } = req.query;

  if(!q && q !== '') {
    res.status(utils.HTTP_OK_STATUS).json([]).end();
    return;
  }

  const result = await blogPostService.findByTerm(q);

  res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router = Router();

export default router
  .post('/', rescue(validate), rescue(create))
  .put('/:id', rescue(update))
  .get('/search', rescue(findByTerm))
  .get('/:id', rescue(findById))
  .get('/', rescue(listAll))
  .delete('/:id', rescue(remove));
