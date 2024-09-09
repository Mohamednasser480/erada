import { Module, forwardRef } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StaffModule } from '../staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
