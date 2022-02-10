import { Category } from '../entity';
import { Err, MESSAGES } from '../../utils/utils';
import { getRepository } from 'typeorm';

async function validate(name: string) {
  console.log(name, 'testesssssdasdasdas');
  if (!name) {
    throw new Err('BAD_REQUEST', MESSAGES.CATEGORY_NAME_NOT_FOUND);
  }

  return name;
}

async function create(name: string) {
  const categoryRepo = getRepository(Category);
  const categoryCheck = await categoryRepo.findOne({ where: { name } });

  if (categoryCheck) {
    throw new Err('CONFLICT', MESSAGES.CATEGORY_ALREADY_EXISTS);
  }

  const newCategory = await categoryRepo.create({ name });
  await categoryRepo.save(newCategory);

  return newCategory;
}

async function listAll() {
  const categoryRepo = getRepository(Category);
  const result = await categoryRepo.find();
  return result;
}

async function findById(id: number) {
  const categoryRepo = getRepository(Category);
  const result = await categoryRepo.findOne({ where: { id } });
  
  if (!result ) {
    throw new Err('NOT_FOUND', MESSAGES.CATEGORY_IDS_INVALID);
  }

  return result;
}

export default {
  validate,
  create,
  listAll,
  findById,
};