import { IsBoolean, IsString } from 'class-validator';
import { IInsuranceCompany } from '../../types';

export class CreateInsuranceCompanyDto implements Partial<IInsuranceCompany> {
    @IsString()
    name: string;

    @IsBoolean()
    status: boolean;

    @IsString()
    bankName: string;

    @IsString()
    accountNumber: string;

    @IsString()
    eradaAccountNumber: string;
}