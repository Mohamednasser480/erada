import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth.constants';
import { AuthService } from './auth.service';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    /* Hello Erada team I am using username instead of stuff id Becouse of o will intiat customer table and user username
   so i should make it uniqu attribute for auth customer and stuff */
    return { userId: payload.uuid,
      phone:payload.phone,
      staffId: payload.staffId};
  }
}
