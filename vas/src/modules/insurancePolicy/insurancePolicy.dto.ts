import { IsString, IsNumber, IsDate } from 'class-validator';
import { IInsurancePolicy } from '../../types';

export class CreateInsurancePolicyDto implements Partial<IInsurancePolicy> {
    @IsString()
    name: string;

   @IsNumber()
   sellAmount: number;

    @IsNumber()
    buyAmount: number;

   @IsDate()
   startDate: Date;

   @IsDate()
   endDate: Date;
}

export class UpdateInsurancePolicyDto {
    @IsNumber()
    sellAmount: number;

    @IsNumber()
    buyAmount: number;

    @IsDate()
    endDate: Date;
}