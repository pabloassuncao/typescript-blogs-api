import Joi from 'joi';
import { MESSAGES } from '../../utils/utils';

const userSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.base': MESSAGES.EMAIL_NOT_STRING,
    'string.email': MESSAGES.EMAIL_INVALID,
    'string.empty': MESSAGES.EMAIL_EMPTY,
    'any.required': MESSAGES.EMAIL_NOT_FOUND,
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': MESSAGES.PASSWORD_NOT_STRING,
    'string.min': MESSAGES.PASSWORD_INVALID,
    'string.empty': MESSAGES.PASSWORD_EMPTY,
    'any.required': MESSAGES.PASSWORD_NOT_FOUND,
  }),
});

export default userSchema;