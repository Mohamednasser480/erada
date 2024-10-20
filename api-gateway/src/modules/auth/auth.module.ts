import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffGuard } from 'src/modules/auth/guards/staff.guard';
import { StaffService } from '../staff/staff.service';
import { StaffModule } from '../staff/staff.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService],
  imports:[
    forwardRef(() => StaffModule),]
})
export class AuthModule {}
