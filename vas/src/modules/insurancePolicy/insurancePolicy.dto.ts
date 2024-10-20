import { IsString, IsNumber, IsDate } from 'class-validator';
import { IInsurancePolicy } from '../../types';

export class CreateInsurancePolicyDto implements Partial<IInsurancePolicy> {
    @IsString()
    name: string;

   @IsNumber()
   amount: number;

   @IsDate()
   startDate: Date;

   @IsDate()
   endDate: Date;
}