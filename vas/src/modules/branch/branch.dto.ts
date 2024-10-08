import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IBranch } from '../..//types';

export class BranchDto implements Partial<IBranch> {
  @IsString()
  name: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  managerId: string;


 
  @IsString()
  gaverment:string;

  @IsString()
  area:string;
  @IsString()
  len?:string;
  @IsString()
  lat?:string

}
