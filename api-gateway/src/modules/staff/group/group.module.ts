import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StaffModule } from '../staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
