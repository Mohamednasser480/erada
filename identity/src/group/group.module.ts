import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { Staff } from '../staff/staff.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StaffModule } from 'src/staff/staff.module';
import { GroupRepository } from 'src/group/group.repository'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Group, Staff]),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
  exports: [],
})
export class GroupModule {}
