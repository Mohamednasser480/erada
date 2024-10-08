import { IStaff } from 'src/types';
import * as yup from 'yup';

export const staffValidationSchema: {
  [key in keyof IStaff]?: yup.AnySchema;
} = {
  name: yup.string().required(),
  staffId: yup.string().required('Please enter valid staff ID').required(),
  password: yup.string().required(),
  phone: yup
    .string()
    .max(13)
    .required('Phone must not more then 13 characters'),
  status: yup.boolean().default(true),
  role: yup.string(),
  branchs: yup.array()
    
};

export const findValidationSchema: {
  [key in keyof IStaff]?: yup.AnySchema;
} = {
  id: yup.string().trim(),
  staffId: yup.string().trim(),
  phone: yup.string().trim(),
};
