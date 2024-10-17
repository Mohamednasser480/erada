import * as yup from 'yup';

export const insurancePolicyValidationSchema = {
    insuranceCompanyId: yup.string().required(),
    name: yup.string().required(),
    sellAmount: yup.number().required(),
    buyAmount: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
};

export const updateInsurancePolicySchema = {
    sellAmount: yup.number().optional(),
    buyAmount: yup.number().optional(),
    endDate: yup.date().optional(),
};
