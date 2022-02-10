import { User } from '../entity';
import { Err, MESSAGES, UserPayload } from '../../utils/utils';
import { getRepository } from 'typeorm';

async function listAll() {
  const userRepo = getRepository(User);
  const result = await userRepo.find();
  return result;
}

async function findById(id: number) {
  const userRepo = getRepository(User);

  const result = await userRepo.findOne({ where: {id}});

  if (!result) {
    throw new Err('NOT_FOUND', MESSAGES.USER_NOT_FOUND);
  }

  return result;
}

async function findByEmail(email: string) {
  const userRepo = getRepository(User);

  const result = await userRepo.findOne({ where: {email}});

  if (!result) {
    throw new Err('NOT_FOUND', MESSAGES.USER_NOT_FOUND);
  }

  return result;
}

async function remove(userInfo: UserPayload) {
  const userRepo = getRepository(User);

  const {id: userId} = userInfo;
  await findById(userId);
  await userRepo.delete({id: userId});
}

export default {
  listAll,
  findById,
  remove,
  findByEmail,
};