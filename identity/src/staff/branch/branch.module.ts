import { forwardRef, Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { StaffModule } from '../staff.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Branch]),
    forwardRef(() => StaffModule),

  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService

  ],
})
export class BranchModule {}
