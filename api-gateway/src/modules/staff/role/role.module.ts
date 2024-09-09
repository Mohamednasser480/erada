import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StaffModule } from '../staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
