import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MembersService } from '../members/members.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private membersService: MembersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '0edf1f0c1307257ef761d92678d47315d2c7df12d2eab346919e5769a9e1fc8833d9aae3857daef37b47df6d732c7ba3acd539f5fb81e8f0185f1ae447b21e63',
    });
  }

  async validate(payload: any) {
    if (payload.type === 'member') {
      const member = await this.membersService.findByEmail(payload.email);
      if (!member) {
        throw new UnauthorizedException();
      }
      return {
        id: payload.sub,
        email: payload.email,
        type: 'member'
      };
    } else {
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }
      return {
        id: payload.sub,
        username: payload.username,
        role: payload.role,
        type: 'staff'
      };
    }
  }
} 