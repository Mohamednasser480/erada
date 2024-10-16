import { IsString, IsInt, IsBoolean, IsDate, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { IProduct } from '../../types';

export class ProductInfoDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsString()
    operatingField: string;

    @IsString()
    branchId: string;

    @IsString()
    partners: string;

    @IsString()
    suppliers: string;

    @IsBoolean()
    requiresGuarantor: boolean;

    @IsInt()
    @IsOptional()
    numberOfGuarantors?: number;

    @IsString()
    insurancePolicyId: string;
}

export class RepaymentFrequencyDto {
    @IsString()
    unit: string;

    @IsInt()
    duration: number;

    @IsString()
    minProductDurationUnit: string;

    @IsInt()
    minProductDuration: number;

    @IsString()
    maxProductDurationUnit: string;

    @IsInt()
    maxProductDuration: number;

    @IsDate()
    productStartDate: Date;

    @IsDate()
    productEndDate: Date;
}

export class IScoreDto {
    @IsBoolean()
    @IsOptional()
    required?: boolean;

    @IsOptional()
    @IsInt()
    min?: number;

    @IsOptional()
    @IsInt()
    max?: number;
}

export class ProductRangeAndInterest {
    @IsInt()
    minProductAmount: number;

    @IsInt()
    maxProductAmount: number;

    @IsString()
    interestType: string;

    @IsString()
    interestUnit: string;

    @IsInt()
    productInterestRate: number;

    @IsInt()
    minInterestRate: number;

    @IsInt()
    maxInterestRate: number;

    @IsInt()
    earlyRepaymentInterest: number;
}


export class CommissionsAndRevenues {
    @IsInt()
    partnerCommissions: number;

    @IsString()
    commissionTiming: string;

    @IsString()
    customerPortfolio: string;

    @IsString()
    customerOutstanding: string;

    @IsInt()
    revenueFromCustomerInterest: number;

    @IsInt()
    revenueFromAdministrativeFees: number;

    @IsInt()
    revenueFromEarlyRepaymentCommission: number;

    @IsInt()
    revenueFromLatePenalty: number;

    @IsInt()
    revenueFromRequestIssuanceFees: number;
}

export class InstallmentsAndRepayment {
    @IsInt()
    installmentCount: number;

    @IsString()
    installmentDurationUnit: string;

    @IsInt()
    minInstallmentAmount: number;

    @IsInt()
    maxInstallmentAmount: number;

    @IsBoolean()
    @IsOptional()
    firstInstallmentDiscount?: boolean;

    @IsString()
    loanDisbursement: string;

    @IsString()
    loanCollection: string;
}

export class AdministrativeFees {
    @IsInt()
    percentage: number;

    @IsInt()
    amount: number;

    @IsString()
    deductFrom: string;
}

export class ApplicationFees {
    @IsInt()
    percentage: number;

    @IsInt()
    amount: number;

    @IsString()
    deductFrom: string;
}

export class PartnerFess {
    @IsInt()
    percentage: number;

    @IsInt()
    amount: number;

    @IsString()
    deductFrom: string;
}

export class LoanConditions {
    @IsBoolean()
    canBorrowOtherLoans: boolean;

    @IsInt()
    minAge: number;

    @IsInt()
    maxAge: number;

    @IsInt()
    minSalary: number;

    @IsInt()
    maxSalary: number;
}

export class Penalties {
    @IsInt()
    lateFees: number;

    @IsInt()
    lateFeesDuration: number;

    @IsInt()
    lateFeePenaltyAmount: number;

    @IsInt()
    lateFeePenaltyPercentage: number;

    @IsInt()
    maxLateFeesPenalty: number;

    @IsString()
    lateFeesPenaltyFrom: string;

    @IsString()
    gracePeriodUnit: string;

    @IsInt()
    gracePeriodBeforePenalty: number;

    @IsString()
    earlyRepaymentLogic: string;

    @IsInt()
    earlyRepaymentPenaltyDuration: number;

    @IsInt()
    earlyRepaymentPenaltyPercentage: number;
}

export class CreateProductDto implements Partial<IProduct> {
    @ValidateNested()
    @Type(() => ProductInfoDto)
    @IsNotEmpty()
    productInfo: ProductInfoDto;

    @ValidateNested()
    @Type(() => RepaymentFrequencyDto)
    @IsNotEmpty()
    repaymentFrequency: RepaymentFrequencyDto;

    @ValidateNested()
    @Type(() => IScoreDto)
    @IsOptional()
    iScore?: IScoreDto;

    @ValidateNested()
    @Type(() => ProductRangeAndInterest)
    @IsNotEmpty()
    productRangeAndInterest: ProductRangeAndInterest;

    @ValidateNested()
    @Type(() => CommissionsAndRevenues)
    @IsNotEmpty()
    commissionsAndRevenues: CommissionsAndRevenues;

    @ValidateNested()
    @Type(() => InstallmentsAndRepayment)
    @IsNotEmpty()
    installmentsAndRepayment: InstallmentsAndRepayment;

    @ValidateNested()
    @Type(() => AdministrativeFees)
    @IsNotEmpty()
    administrativeFees: AdministrativeFees;

    @ValidateNested()
    @Type(() => ApplicationFees)
    @IsNotEmpty()
    applicationFees: ApplicationFees;

    @ValidateNested()
    @Type(() => PartnerFess)
    @IsNotEmpty()
    partnerFess: PartnerFess;

    @ValidateNested()
    @Type(() => LoanConditions)
    @IsNotEmpty()
    loanConditions: LoanConditions;

    @ValidateNested()
    @Type(() => Penalties)
    @IsNotEmpty()
    penalties: Penalties;

    @IsString()
    @IsNotEmpty()
    workflowId: string;
}


