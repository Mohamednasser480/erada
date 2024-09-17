import { IBranch } from '../../types';
import * as yup from 'yup';

export const branchValidationSchema: {
  [key in keyof IBranch]?: yup.AnySchema;
} = {
  name: yup.string().required(),
  gaverment: yup.string().required(),
  area: yup.string().required(),
  managerId: yup.string().required().default(null),
  lat: yup.string().default('null'),
  len: yup.string().required().default('null'),
  status: yup.boolean().required().default(true),



};
export const branchStatusValidationSchema: {
  [key in keyof IBranch]?: yup.AnySchema;
} = {
  status: yup.boolean().required().default(true),
};
