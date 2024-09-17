import * as yup from 'yup';

export const employeeValidationSchema = {
  role: yup.string().required(),
  employee: yup
    .array(
      yup
        .object({
          sidebar: yup.string().required(),
          action: yup.string().required(),
        })
        .required(),
    )
    .required(),
};

export const updatePermissionValidationSchema = {
  role: yup.string().required(),
  //TODO:we need to modify later
  // employee: yup
  //   .array(
  //     yup
  //       .object({
  //         sidebar: yup.string().required(),
  //         action: yup.string().optional(),
  //       })
  //       .required(),
  //   )
  //   .required(),
  employee: yup
    .object({
      sidebar: yup.string().required(),
    })
    .required(''),
};
