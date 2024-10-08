import * as yup from 'yup';

export const insuranceCompanyValidationSchema = {
    name: yup.string().required(),
    bankName: yup.string().required(),
    accountNumber: yup.string().required(),
    eradaAccountNumber: yup.string().required(),
};

export const updateInsuranceCompanyValidationSchema = {
    bankName: yup.string().required(),
    accountNumber: yup.string().required(),
    eradaAccountNumber: yup.string().required(),
};