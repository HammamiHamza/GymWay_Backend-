import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MembersService } from '../members/members.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  async validateStaff(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateMember(email: string, password: string) {
    const member = await this.membersService.findByEmail(email);
    if (member && await bcrypt.compare(password, member.password)) {
      return member;
    }
    return null;
  }

  async loginStaff(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginMember(member: any) {
    const payload = { email: member.email, sub: member.id, type: 'member' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 