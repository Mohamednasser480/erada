import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StaffModule } from '../staff/staff.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { PermissionModule } from 'src/permission/permission.module';
import { ActionModule } from 'src/action/action.module';
@Module({
  imports: [
    forwardRef(() => StaffModule),
    // forwardRef(() => ActionModule),
    PassportModule,
    PermissionModule,
    ActionModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90sec' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
