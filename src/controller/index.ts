import userCreateController from './userCreateController';
import loginController from './loginController';
import authController from './authController';
import userController from './userController';
import categoryController from './categoryController';
import blogPostController from './blogPostController';
import { Router } from 'express';
import utils from '../../utils/utils';

const route = Router();

export default route.use(utils.USER_ROUTE, userCreateController)
  .use(utils.LOGIN_ROUTE, loginController)
  .use(authController)
  .use(utils.USER_ROUTE, userController)
  .use(utils.CATEGORY_ROUTE, categoryController)
  .use(utils.POST_ROUTE, blogPostController)

