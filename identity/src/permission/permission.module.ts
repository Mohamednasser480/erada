import { Module, forwardRef } from '@nestjs/common';
import { PermissionController } from '../permission/permission.controller';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/permission.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { Sidebar } from 'src/sidebar/sidebar.entity';
import { StaffModule } from 'src/staff/staff.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Permission, Sidebar]),
    RoleModule,
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
