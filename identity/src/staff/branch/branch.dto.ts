import {  IsString } from '@nestjs/class-validator';
import { IBranch } from 'src/types';

export class BranchDto implements Partial<IBranch> {
  @IsString()
  branchId: string;


  
  staff: string;

}
export class FindBranchDto implements Partial<IBranch> {
  

}
