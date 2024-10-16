import { Column, ManyToOne, Entity, JoinColumn} from 'typeorm';
import { BaseEntityWithMeta } from '../../abstract';
import { Branch } from '../branch/branch.entity';
import { InsuranceCompanyEntity } from '../insuranceCompany/insuranceCompany.entity';
import { InsurancePolicyEntity } from '../insurancePolicy/insurancePolicy.entity';
import {Workflow} from "./workflow/workflow.entity";

export class ProductInfo {
    @Column({ type: 'varchar', length: 255})
    name: string;

    @Column({ type: 'varchar', length: 255})
    type: string;

    @Column({ type: 'varchar', length: 255})
    operatingField: string;

    @Column({ type: 'boolean', default: false})
    requiresGuarantor: boolean;

    @Column({ type: 'int', nullable: true})
    numberOfGuarantors: number;

    @Column({ type: 'varchar', length: 255})
    partners: string;

    @Column({ type: 'varchar', length: 255})
    suppliers: string;

    @ManyToOne(() => Branch)
    @JoinColumn({ name: 'branchId' })
    branch: Branch;
    @Column()
    branchId: string;

    @ManyToOne(() => InsuranceCompanyEntity)
    @JoinColumn({ name: 'insuranceCompanyId' })
    insuranceCompany: InsuranceCompanyEntity;
    @Column()
    insuranceCompanyId: string;

    @ManyToOne(() => InsurancePolicyEntity)
    @JoinColumn({ name: 'policyId' })
    policy: InsurancePolicyEntity;
    @Column()
    insurancePolicyId: string;
}

export class RepaymentFrequency {
    @Column({ type: 'varchar', length: 255})
    unit: string;

    @Column({ type: 'int' })
    duration: number;

    @Column({ type: 'varchar', length: 255})
    minProductDurationUnit: string;

    @Column({ type: 'int' })
    minProductDuration: number;

    @Column({ type: 'varchar', length: 255})
    maxProductDurationUnit: string;

    @Column({ type: 'int' })
    maxProductDuration: number;

    @Column({ type: 'date' })
    productStartDate: Date;

    @Column({ type: 'date' })
    productEndDate: Date;
}

class IScore {
    @Column({ type: 'boolean', default: false})
    required: boolean;

    @Column({ type: 'int', nullable: true})
    min: number;

    @Column({ type: 'int', nullable: true })
    max: number;
}

class ProductRangeAndInterest {
    @Column({ type: 'int' })
    minProductAmount: number;

    @Column({ type: 'int' })
    maxProductAmount: number;

    @Column({ type: 'varchar', length: 255})
    interestType: string;

    @Column({ type: 'varchar', length: 255})
    interestUnit: string;

    @Column({ type: 'int' })
    productInterestRate: number;

    @Column({ type: 'int' })
    minInterestRate: number;

    @Column({ type: 'int' })
    maxInterestRate: number;

    @Column({ type: 'int' })
    earlyRepaymentInterest: number;
}

class CommissionsAndRevenues {
    @Column({ type: 'int' })
    partnerCommissions: number;

    @Column({ type: 'varchar', length: 255})
    commissionTiming: string;

    @Column({ type: 'varchar', length: 255})
    customerPortfolio: string;

    @Column({ type: 'varchar', length: 255})
    customerOutstanding: string;

    @Column({ type: 'int' })
    revenueFromCustomerInterest: number;

    @Column({ type: 'int' })
    revenueFromAdministrativeFees: number;

    @Column({ type: 'int' })
    revenueFromEarlyRepaymentCommission: number;

    @Column({ type: 'int' })
    revenueFromLatePenalty: number;

    @Column({ type: 'int' })
    revenueFromRequestIssuanceFees: number;
}

class InstallmentsAndRepayment {
    @Column({ type: 'int' })
    installmentCount: number;

    @Column({ type: 'varchar', length: 255})
    installmentDurationUnit: string;

    @Column({ type: 'int' })
    minInstallmentAmount: number;

    @Column({ type: 'int' })
    maxInstallmentAmount: number;

    @Column({ type: 'boolean', default: false})
    firstInstallmentDiscount: boolean;

    @Column({ type: 'varchar', length: 255})
    loanDisbursement: string;

    @Column({ type: 'varchar', length: 255})
    loanCollection: string;
}

class AdministrativeFees {
    @Column({ type: 'int' })
    percentage: number;

    @Column({ type: 'int' })
    amount: number;

    @Column({ type: 'varchar', length: 255})
    deductFrom: string;
}

class ApplicationFees {
    @Column({ type: 'int' })
    percentage: number;

    @Column({ type: 'int' })
    amount: number;

    @Column({ type: 'varchar', length: 255})
    deductFrom: string;
}

class PartnerFess {
    @Column({ type: 'int' })
    percentage: number;

    @Column({ type: 'int' })
    amount: number;

    @Column({ type: 'varchar', length: 255})
    deductFrom: string;
}

class LoanConditions {
    @Column({ type: 'boolean' })
    canBorrowOtherLoans: boolean;

    @Column({ type: 'int' })
    minAge: number;

    @Column({ type: 'int' })
    maxAge: number;

    @Column({ type: 'int' })
    minSalary: number;

    @Column({ type: 'int' })
    maxSalary: number;
}

class Penalties {
    @Column({ type: 'int' })
    lateFees: number;

    @Column({ type: 'int' })
    lateFeesDuration: number;

    @Column({ type: 'int' })
    lateFeePenaltyAmount: number;

    @Column({ type: 'int' })
    lateFeePenaltyPercentage: number;

    @Column({ type: 'int' })
    maxLateFeesPenalty: number;

    @Column({ type: 'varchar', length: 255})
    lateFeesPenaltyFrom: string;

    @Column({ type: 'varchar', length: 255})
    gracePeriodUnit: string;

    @Column({ type: 'int' })
    gracePeriodBeforePenalty: number;

    @Column({ type: 'varchar', length: 255})
    earlyRepaymentLogic: string;

    @Column({ type: 'int' })
    earlyRepaymentPenaltyDuration: number;

    @Column({ type: 'int' })
    earlyRepaymentPenaltyPercentage: number;
}

@Entity()
export class ProductEntity extends BaseEntityWithMeta {
    @Column(type => ProductInfo)
    productInfo: ProductInfo;

    @Column(type => RepaymentFrequency)
    repaymentFrequency: RepaymentFrequency;

    @Column(type => IScore)
    iScore: IScore;

    @Column(type => ProductRangeAndInterest)
    productRangeAndInterest: ProductRangeAndInterest;

    @Column(type => CommissionsAndRevenues)
    commissionsAndRevenues: CommissionsAndRevenues;

    @Column(type => InstallmentsAndRepayment)
    installmentsAndRepayment: InstallmentsAndRepayment;

    @Column(type => AdministrativeFees)
    administrativeFees: AdministrativeFees;

    @Column(type => ApplicationFees)
    applicationFees: ApplicationFees;

    @Column(type => PartnerFess)
    partnerFess: PartnerFess;

    @Column(type => LoanConditions)
    loanConditions: LoanConditions;

    @Column(type => Penalties)
    penalties: Penalties;

    @ManyToOne(() => Workflow)
    @JoinColumn({ name: 'workflowId' })
    workflow: Workflow;
    @Column()
    workflowId: string;
}
