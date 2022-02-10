import Joi from 'joi';
import { MESSAGES } from '../../utils/utils';

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).messages({
    'string.base': MESSAGES.DS_NAME_NOT_STRING,
    'string.min': MESSAGES.DS_NAME_INVALID,
    'any.required': MESSAGES.DS_NAME_NOT_FOUND,
  }),
  email: Joi.string().required().email().messages({
    'string.base': MESSAGES.EMAIL_NOT_STRING,
    'string.email': MESSAGES.EMAIL_INVALID,
    'any.required': MESSAGES.EMAIL_NOT_FOUND,
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': MESSAGES.PASSWORD_NOT_STRING,
    'string.min': MESSAGES.PASSWORD_INVALID,
    'any.required': MESSAGES.PASSWORD_NOT_FOUND,
  }),
  image: Joi.string(),
});

export default userSchema;