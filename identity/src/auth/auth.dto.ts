import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IStaff } from 'src/types';

export class AuthDto implements Partial<IStaff> {
  @ApiProperty({ description: 'staffId' })
  @IsString()
  staffId: string;
  @ApiProperty({ description: 'Password' })
  @IsNumber()
  password: string;
}
export class resetPasswordAuthDto implements Partial<IStaff> {
  @ApiProperty({ description: 'Old password ' })
  @IsString()
  oldPassword: string;
  @ApiProperty({ description: 'new Password' })
  @IsNumber()
  newPassword: string;
}
