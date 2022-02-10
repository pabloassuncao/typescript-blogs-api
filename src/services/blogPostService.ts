import { Op } from 'sequelize';
import { ParsedQs } from 'qs';
import blogPostSchema from '../schemas/blogPostSchema';
import { BlogPost, User, Category } from '../entity/index';
import {getRepository} from "typeorm";

import { BlogPostInfo, Err, MESSAGES, UpdatePostInfo, UserPayload } from '../../utils/utils';

import categoryService from './categoryService';

async function create({ title, content, categoryIds }: BlogPostInfo, userInfo: UserPayload) {
  const blogPostRepo = getRepository(BlogPost);
  
  try {
    const userId = userInfo.id
    
    const categoriesChecker = categoryIds.map(async (categoryId) => {
      await categoryService.findById(categoryId);
    });
  
    await Promise.all(categoriesChecker);

    console.log(userId, 'userId');
    const blogPost = await blogPostRepo.create({ 
      title,
      userId,
      content,
      published: new Date(),
      updated: new Date()
    });
     await blogPostRepo.save(blogPost);

    return blogPost;
  } catch (e) {
    throw new Err('BAD_REQUEST', MESSAGES.CATEGORY_IDS_INVALID);
  }
}

async function listAll() {
  const blogPostRepo = getRepository(BlogPost);
  const result = await blogPostRepo.find({ relations: ['user', 'categories'] });
  return result;
}

async function findById(id: number) {
  const blogPostRepo = getRepository(BlogPost);
  const result = await blogPostRepo.findOne(id, {
    relations: ['user', 'categories'],
  });

  if (!result) {
    throw new Err('NOT_FOUND', MESSAGES.BLOG_POST_NOT_FOUND);
  }

  return result;
}

async function validate(blogPostInfo: BlogPostInfo | UpdatePostInfo) {
  const { error } = await blogPostSchema.validate(blogPostInfo);
  
  if (error) {
    console.log('erro no joi');
    
    throw new Err(error.details[0].type, error.details[0].message);
  }

  return blogPostInfo;
}

async function userIsCreatorVerifier(id: number, UserInfo: UserPayload) {
  const {id: userId} = UserInfo;
  const blogPost = await findById(id);

  if (blogPost.userId !== userId) {
    throw new Err('UNAUTHORIZED', MESSAGES.UNAUTHORIZED_USER);
  }
}

async function updateValidate(id: number, updateInfo: UpdatePostInfo, UserInfo: UserPayload) {
  await userIsCreatorVerifier(id, UserInfo);
  
  if (updateInfo.categoryIds) {
    throw new Err('BAD_REQUEST', MESSAGES.CATEGORY_IDS_NOT_ALLOWED);
  }

  const teste = updateInfo;

  // Adiciona categoria temporariamente para usar o mesmo schema do create
  teste.categoryIds = [1,2,3];
  await validate(teste);
}

async function update(id: number, updateInfo: UpdatePostInfo, UserInfo: UserPayload) {
  const blogPostRepo = getRepository(BlogPost);
  
  await updateValidate(id, updateInfo, UserInfo);

  await findById(id);

  await blogPostRepo.save({ id, ...updateInfo });

  const result = await findById(id);

  console.log(result);
  

  return result;
}

async function remove(id: number, UserInfo: UserPayload) {
  const blogPostRepo = getRepository(BlogPost);
  await userIsCreatorVerifier(id, UserInfo);

  await findById(id);

  await blogPostRepo.delete({ id });
}

async function findByTerm(term: string | ParsedQs | string[] | ParsedQs[]) {
  const blogPostRepo = getRepository(BlogPost);

  const result = await blogPostRepo.createQueryBuilder('blogPost')
    .leftJoinAndSelect('blogPost.user', 'user')
    .leftJoinAndSelect('blogPost.categories', 'categories')
    .where('blogPost.title LIKE :term', { term: `%${term}%` })
    .orWhere('blogPost.content LIKE :term', { term: `%${term}%` })
    .getMany();

  if (!result) {
    return [];
  }

  return result;
}

export default {
  validate,
  create,
  listAll,
  findById,
  update,
  remove,
  findByTerm,
};