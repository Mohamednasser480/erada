import { IsBoolean, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IGroup } from '../types';

export class GroupDto implements Partial<IGroup> {
  @ApiProperty({ description: 'group name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'status' })
  @IsBoolean()
  isActive: boolean;
}


