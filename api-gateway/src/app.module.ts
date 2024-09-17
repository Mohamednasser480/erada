import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './modules/staff/staff.module';
import { config as dotenvConfig } from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { SidebarModule } from './modules/staff/sidebar/sidebar.module';
import { RoleModule } from './modules/staff/role/role.module';
import { PermissionModule } from './modules/staff/permission/permission.module';
import { ActionModule } from './modules/staff/action/action.module';
import { BranchModule } from './modules/VAS/branch/branch.module';

dotenvConfig({ path: '.env' });
console.log( process.env.IDENTITY_HOST); 
@Module({
  imports: [StaffModule, AuthModule,
    StaffModule,
    SidebarModule,
    RoleModule,
    PermissionModule,
    ActionModule,
    BranchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
