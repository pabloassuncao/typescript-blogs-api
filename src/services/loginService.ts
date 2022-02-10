import { Err, LoginInfo, MESSAGES } from "../../utils/utils";

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import loginSchema from '../schemas/loginSchema';
import { User } from '../entity';
import { getRepository } from "typeorm";
import userService from "./userService";

async function validate(loginInfo: LoginInfo) {
  const { error } = await loginSchema.validate(loginInfo);
  
  if (error) {
    throw new Err(error.details[0].type, error.details[0].message);
  }

  return loginInfo;
}

async function loginVerifier(hash: string, user: LoginInfo){
  if (!argon2.verify(hash, user.password)) throw new Err('BAD_REQUEST', MESSAGES.CREDENTIALS_INVALID);

  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

  const userFullInfo = await userService.findByEmail(user.email);

  return jwt.sign(JSON.parse(JSON.stringify(userFullInfo)), 
  process.env.JWT_SECRET,
  { expiresIn: '1d', algorithm: 'HS256' });
}

async function login({ email, password }: LoginInfo) {
  const userRepo = getRepository(User);

  const user = await userRepo.findOne({ where: { email } });

  if (!user) throw new Err('BAD_REQUEST', MESSAGES.USER_NOT_EXISTS);

  const result = loginVerifier(user.password, { email, password });

  return result;
}

export default {
  validate,
  login,
};