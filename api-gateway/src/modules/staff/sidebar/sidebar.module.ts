import { Module } from '@nestjs/common';
import { SidebarController } from './sidebar.controller';
import { SidebarService } from './sidebar.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StaffModule } from '../staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    StaffModule,
  ],
  controllers: [SidebarController],
  providers: [SidebarService],
  exports: [SidebarService],
})
export class SidebarModule {}
