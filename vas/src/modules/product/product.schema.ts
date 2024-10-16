import * as yup from 'yup';

const productInfo = {
    name: yup.string().required(),
    type: yup.string().required(),
    operatingField: yup.string().required(),
    branchId: yup.string().required(),
    requiresGuarantor: yup.boolean().optional().default(false),
    numberOfGuarantors: yup.number().optional(),
    partners: yup.string().required(),
    suppliers: yup.string().required(),
    insurancePolicyId: yup.string().required()
}

const repaymentFrequency = {
    unit: yup.string().required(),
    duration: yup.number().required(),
    minProductDurationUnit: yup.string().required(),
    minProductDuration: yup.number().required(),
    maxProductDurationUnit: yup.string().required(),
    maxProductDuration: yup.number().required(),
    productStartDate: yup.date().required(),
    productEndDate: yup.date().required()
}

const iScore = {
    required: yup.boolean().optional().default(false),
    min: yup.number().optional(),
    max: yup.number().optional(),
};

const productRangeAndInterest = {
    minProductAmount: yup.number().required(),
    maxProductAmount: yup.number().required(),
    interestType: yup.string().required(),
    interestUnit: yup.string().required(),
    productInterestRate: yup.number().required(),
    minInterestRate: yup.number().required(),
    maxInterestRate: yup.number().required(),
    earlyRepaymentInterest: yup.number().required(),
}

const commissionsAndRevenues = {
    partnerCommissions: yup.number().required(),
    commissionTiming: yup.string().required(),
    customerPortfolio: yup.string().required(),
    customerOutstanding: yup.string().required(),
    revenueFromCustomerInterest: yup.number().required(),
    revenueFromAdministrativeFees: yup.number().required(),
    revenueFromEarlyRepaymentCommission: yup.number().required(),
    revenueFromLatePenalty: yup.number().required(),
    revenueFromRequestIssuanceFees: yup.number().required(),
}

const InstallmentsAndRepayment = {
    installmentCount: yup.number().required(),
    installmentDurationUnit: yup.string().required(),
    minInstallmentAmount: yup.number().required(),
    maxInstallmentAmount: yup.number().required(),
    firstInstallmentDiscount: yup.boolean().optional().default(false),
    loanDisbursement: yup.string().required(),
    loanCollection: yup.string().required(),
}

const AdministrativeFees = {
    percentage: yup.number().required(),
    amount: yup.number().required(),
    deductFrom: yup.string().required(),
}

const ApplicationFees = {
    percentage: yup.number().required(),
    amount: yup.number().required(),
    deductFrom: yup.string().required(),
}

const PartnerFees = {
    percentage: yup.number().required(),
    amount: yup.number().required(),
    deductFrom: yup.string().required(),
}

const LoadConditions = {
    canBorrowOtherLoans: yup.boolean().required(),
    minAge: yup.number().required(),
    maxAge: yup.number().required(),
    minSalary: yup.number().required(),
    maxSalary: yup.number().required(),
}

const Penalties = {
    lateFees: yup.number().required(),
    lateFeesDuration: yup.number().required(),
    lateFeePenaltyAmount: yup.number().required(),
    lateFeePenaltyPercentage: yup.number().required(),
    maxLateFeesPenalty: yup.number().required(),
    lateFeesPenaltyFrom: yup.string().required(),
    gracePeriodUnit: yup.string().required(),
    gracePeriodBeforePenalty: yup.number().required(),
    earlyRepaymentLogic: yup.string().required(),
    earlyRepaymentPenaltyDuration: yup.number().required(),
    earlyRepaymentPenaltyPercentage: yup.number().required(),
}

export const productSchema = {
    productInfo: yup.object().shape(productInfo),
    repaymentFrequency: yup.object().shape(repaymentFrequency),
    iScore: yup.object().optional().shape(iScore),
    productRangeAndInterest: yup.object().shape(productRangeAndInterest),
    commissionsAndRevenues: yup.object().shape(commissionsAndRevenues),
    installmentsAndRepayment: yup.object().shape(InstallmentsAndRepayment),
    administrativeFees: yup.object().shape(AdministrativeFees),
    applicationFees: yup.object().shape(ApplicationFees),
    partnerFess: yup.object().shape(PartnerFees),
    loanConditions: yup.object().shape(LoadConditions),
    penalties: yup.object().shape(Penalties),
    workflowId: yup.string().required()
};