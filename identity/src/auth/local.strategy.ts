import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(staffId: string, password: string): Promise<any> {
    const staff = await this.authService.validateStaff({ staffId, password });

    if (!staff) {
      throw new UnauthorizedException();
    }

    return staff;
  }
}
