import { IsBoolean, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IStaff } from 'src/types';

export class StaffDto implements Partial<IStaff> {
  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'staffId' })
  @IsString()
  staffId: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Role' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'phone' })
  @IsNumber()
  phone: number;

  @ApiProperty({ description: 'active' })
  @IsBoolean()
  status: boolean;
}
export class FindStaffDto implements Partial<IStaff> {
  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'staffId' })
  @IsString()
  staffId: string;
  @ApiProperty({ description: 'Role' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'phone' })
  @IsNumber()
  phone: number;
}
