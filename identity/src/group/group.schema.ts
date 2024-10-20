import { IGroup } from '../types';
import * as yup from 'yup';

export const groupValidationSchema: {
  [key in keyof IGroup]?: yup.AnySchema;
} = {
  name: yup.string().required(),
  isActive: yup.boolean().required().default(true),
};
export const groupStatusValidationSchema: {
  [key in keyof IGroup]?: yup.AnySchema;
} = {
  isActive: yup.boolean().required().default(true),
};
