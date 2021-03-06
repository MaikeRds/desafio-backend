import { IPayload } from 'src/shared/interfaces/IPayload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_KEY,
    });
  }

  async validate(payload: IPayload): Promise<any> {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
