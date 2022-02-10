import { ParamsDictionary } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

// Types
export interface BlogPostInfo {
  title: string,
  content: string,
  categoryIds: number[],
}

export interface UpdatePostInfo {
  title: string,
  content: string,
  categoryIds?: number[],
}

export interface UserPayload extends JwtPayload { 
  displayName: string,
  email: string,
  password: string,
  image?: string,
}

export interface UserInfo {
  displayName: string,
  email: string,
  password: string,
  image?: string,
}

export interface LoginInfo {
  email: string,
  password: string,
}

export class Err {
  code: string;
  message: string;

  constructor(code: string = '', message: string = '') {
    this.code = code;
    this.message = message;
  }
}

// PATH

// Messages
export enum MESSAGES {
  DS_NAME_INVALID = '"displayName" length must be at least 8 characters long',
  DS_NAME_NOT_STRING = '"displayName" should be a string',
  DS_NAME_NOT_FOUND = '"displayName" is required',
  EMAIL_INVALID = '"email" must be a valid email',
  EMAIL_NOT_FOUND = '"email" is required',
  EMAIL_NOT_STRING = '"email" should be a string',
  EMAIL_EMPTY = '"email" is not allowed to be empty',
  PASSWORD_INVALID = '"password" length must be 6 characters long',
  PASSWORD_NOT_FOUND = '"password" is required',
  PASSWORD_NOT_STRING = '"password" should be a string',
  PASSWORD_EMPTY = '"password" is not allowed to be empty',
  USER_ALREADY_EXISTS = 'User already registered',
  USER_NOT_EXISTS = 'Invalid fields',
  USER_NOT_FOUND = 'User does not exist',
  CREDENTIALS_INVALID = 'Invalid credentials',
  TOKEN_NOT_FOUND = 'Token not found',
  TOKEN_INVALID = 'Expired or invalid token',
  CATEGORY_NAME_NOT_FOUND = '"name" is required',
  CATEGORY_ALREADY_EXISTS = 'User already registered',
  TITLE_NOT_STRING = '"title" should be a string',
  TITLE_NOT_FOUND = '"title" is required',
  CONTENT_NOT_STRING = '"content" should be a string',
  CONTENT_NOT_FOUND = '"content" is required',
  CATEGORY_IDS_NOT_FOUND = '"categoryIds" is required',
  CATEGORY_IDS_INVALID = '"categoryIds" not found',
  BLOG_POST_NOT_FOUND = 'Post does not exist',
  CATEGORY_IDS_NOT_ALLOWED = 'Categories cannot be edited',
  UNAUTHORIZED_USER = 'Unauthorized user',
};
// HTTP response status codes
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CONFLICT_STATUS = 409;
const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

// Errors code
export enum ERR_CODES {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCCESSABLE_ENTITY = 422,
  'string.empty' = 400, 
  'string.base' = 400,
  'string.min' = 400,
  'string.email'= 400,
  'any.required' = 400,
  'number.min' = 400,
  'number.base' = 400,
}

// Routes
const USER_ROUTE = '/user';
const LOGIN_ROUTE = '/login';
const CATEGORY_ROUTE = '/categories';
const POST_ROUTE = '/post';

// Port
const PORT = '3000';

// Functions

// Export

export default {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_NO_CONTENT_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_UNPROCCESSABLE_ENTITY_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  USER_ROUTE,
  LOGIN_ROUTE,
  CATEGORY_ROUTE,
  POST_ROUTE,
  PORT,
}