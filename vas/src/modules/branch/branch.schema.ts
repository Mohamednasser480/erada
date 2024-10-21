import { IBranch } from '../../types';
import * as yup from 'yup';
const statusName = ['freezed', 'closed', 'active',];

export const branchValidationSchema: {
  [key in keyof IBranch]?: yup.AnySchema;
} = {
  name: yup.string().required(),
  government: yup.string().required(),
  area: yup.string().required(),
  managerId: yup.string().required().default(null),
  lat: yup.string().nullable().optional().default(''),
  len: yup.string().nullable().optional().default(''),
  status: yup.string().required().default('active').oneOf(statusName),
  street: yup.string().nullable().optional().default(''),
  buildingNO: yup.string().nullable().optional().default(''),
  landmark: yup.string().nullable().optional().default(''),
  city: yup.string().required().default('')
};
export const branchStatusValidationSchema: {
  [key in keyof IBranch]?: yup.AnySchema;
} = {
  status: yup.string().required().default('active').oneOf(statusName),
};
