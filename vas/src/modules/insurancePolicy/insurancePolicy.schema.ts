import * as yup from 'yup';

export const insurancePolicyValidationSchema = {
    insuranceCompanyId: yup.string().required(),
    name: yup.string().required(),
    amount: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
};