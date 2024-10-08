import { Module } from '@nestjs/common';
import { StuffController } from './staff.controller';
import { StaffService } from './staff.service';
import { Staff } from './staff.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Branch } from './branch/branch.entity';
import { BranchModule } from './branch/branch.module';
@Module({
  imports: [
    CacheModule.register({ host: '127.0.0.1', port: 6379, db: 0, ttl: 100000 }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Staff,Branch]),
    AuthModule,
    BranchModule,
  ],

  controllers: [StuffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
