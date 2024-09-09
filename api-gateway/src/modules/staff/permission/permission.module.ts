import { Module, forwardRef } from '@nestjs/common';
import { PermissionController } from '../permission/permission.controller';
import { PermissionService } from '../permission/permission.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from '../role/role.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StaffModule } from '../staff.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    RoleModule,
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
