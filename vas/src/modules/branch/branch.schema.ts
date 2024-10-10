import { IBranch } from '../../types';
import * as yup from 'yup';
const statusName = ['freezed', 'closed', 'active',];

export const branchValidationSchema: {
  [key in keyof IBranch]?: yup.AnySchema;
} = {
  name: yup.string().required(),
  gaverment: yup.string().required(),
  area: yup.string().required(),
  managerId: yup.string().required().default(null),
  lat: yup.string().default('null'),
  len: yup.string().required().default('null'),
  status: yup.string().required().default('active').oneOf(statusName),
  street: yup.string().required().default('null'),
  buildingNO: yup.string().required().default('null'),
  landmark: yup.string().required().default('null'),
  city: yup.string().required().default('null')



};
export const branchStatusValidationSchema: {
  [key in keyof IBranch]?: yup.AnySchema;
} = {
  status: yup.boolean().required().default(true),
};
