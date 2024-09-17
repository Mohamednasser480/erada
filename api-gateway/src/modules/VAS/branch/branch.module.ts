import { Module, forwardRef } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { StaffModule } from '../../staff/staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}
