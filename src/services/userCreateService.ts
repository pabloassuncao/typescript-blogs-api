import { Err, MESSAGES, UserInfo } from "../../utils/utils";

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import userSchema from '../schemas/userSchema';
import { User } from '../entity';
import { getRepository } from "typeorm";

async function validate(userInfo: UserInfo) {
  const { error } = await userSchema.validate(userInfo);
  
  if (error) {
    throw new Err(error.details[0].type, error.details[0].message);
  }

  return userInfo;
}

async function create({ displayName, email, password, image }: UserInfo) {
  const userRepo = getRepository(User);

  const userCheck = await userRepo.findOne({
    where: {
      email,
    },
  });

  console.log(userCheck);
  

  if (userCheck) {
    throw new Err('CONFLICT', MESSAGES.USER_ALREADY_EXISTS);
  }

  const pass = await argon2.hash(password, { type: argon2.argon2id });

  const result = userRepo.create({ displayName, email, password: pass, image });
  await userRepo.save(result);
  
  if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  
  return jwt
    .sign(JSON.parse(JSON.stringify(result)), process.env.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
}

export default {
  validate,
  create,
};