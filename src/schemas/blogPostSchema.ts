import Joi from 'joi';
import { MESSAGES } from '../../utils/utils';

const BlogPost = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': MESSAGES.TITLE_NOT_STRING,
    'any.required': MESSAGES.TITLE_NOT_FOUND,
  }),
  content: Joi.string().required().messages({
    'string.base': MESSAGES.CONTENT_NOT_STRING,
    'any.required': MESSAGES.CONTENT_NOT_FOUND,
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': MESSAGES.CATEGORY_IDS_NOT_FOUND,
  }),
});

export default BlogPost;