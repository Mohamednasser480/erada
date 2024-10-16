interface IBase {
  createdAt?: any;
  updatedAt?: any;
  deletedAt?:any;
}

interface IBaseWithId extends IBase {
  id: string;
}

export interface IBaseWithMeta extends IBaseWithId {
  createdBy?: string;
  updatedBy?: string;
}

export interface IBranch extends IBaseWithMeta{
  managerId: string;
  status:string;
  name:string;
  government:string;
  area:string;
  len?:string;
  lat?:string
  street?:string
  buildingNO?:string
  landmark?:string
  staffs?:any
  city?:any
}

export interface IEmployee extends IBaseWithId{
  branch: string;
  staff?:any
  staffId:string
}

export interface IInsuranceCompany extends IBaseWithMeta {
  name: string;
  bankName: string;
  accountNumber: string;
  eradaAccountNumber: string;
  status: boolean;
  policiesCount: number;
}

export interface IInsurancePolicy extends IBaseWithMeta {
  insuranceCompanyId: string;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

interface IProductInfo {
  name: string;
  type: string;
  operatingField: string;
  branchId: string;
  requiresGuarantor: boolean;
  numberOfGuarantors?: number;
  partners: string;
  suppliers: string;
  insuranceCompanyId?: string;
  insurancePolicyId: string;
}

interface IRepaymentFrequency {
  unit: string;
  duration: number;
  minProductDurationUnit: string;
  minProductDuration: number;
  maxProductDurationUnit: string;
  maxProductDuration: number;
  productStartDate: Date;
  productEndDate: Date;
}

interface IIScore {
  required?: boolean;
  min?: number;
  max?: number;
}

interface IProductRangeAndInterest {
  minProductAmount: number;
  maxProductAmount: number;
  interestType: string;
  interestUnit: string;
  productInterestRate: number;
  minInterestRate: number;
  maxInterestRate: number;
  earlyRepaymentInterest: number;
}

interface ICommissionsAndRevenues {
  partnerCommissions: number;
  commissionTiming: string;
  customerPortfolio: string;
  customerOutstanding: string;
  revenueFromCustomerInterest: number;
  revenueFromAdministrativeFees: number;
  revenueFromEarlyRepaymentCommission: number;
  revenueFromLatePenalty: number;
  revenueFromRequestIssuanceFees: number;
}

interface IInstallmentsAndRepayment {
  installmentCount: number;
  installmentDurationUnit: string;
  minInstallmentAmount: number;
  maxInstallmentAmount: number;
  firstInstallmentDiscount?: boolean;
  loanDisbursement: string;
  loanCollection: string;
}

interface IAdministrativeFees {
  percentage: number;
  amount: number;
  deductFrom: string;
}

interface IApplicationFees {
  percentage: number;
  amount: number;
  deductFrom: string;
}

interface IPartnerFees {
  percentage: number;
  amount: number;
  deductFrom: string;
}
interface ILoanConditions {
  canBorrowOtherLoans: boolean;
  minAge: number;
  maxAge: number;
  minSalary: number;
  maxSalary: number;
}

interface IPenalties {
  lateFees: number;
  lateFeesDuration: number;
  lateFeePenaltyAmount: number;
  lateFeePenaltyPercentage: number;
  maxLateFeesPenalty: number;
  lateFeesPenaltyFrom: string;
  gracePeriodUnit: string;
  gracePeriodBeforePenalty: number;
  earlyRepaymentLogic: string;
  earlyRepaymentPenaltyDuration: number;
  earlyRepaymentPenaltyPercentage: number;
}

export interface IProduct extends IBaseWithMeta {
  productInfo: IProductInfo;
  repaymentFrequency: IRepaymentFrequency;
  iScore?: IIScore;
  productRangeAndInterest: IProductRangeAndInterest;
  commissionsAndRevenues: ICommissionsAndRevenues;
  installmentsAndRepayment: IInstallmentsAndRepayment;
  administrativeFees: IAdministrativeFees;
  applicationFees: IApplicationFees;
  partnerFess: IPartnerFees;
  loanConditions: ILoanConditions;
  penalties:IPenalties;
  workflowId: string;
}

