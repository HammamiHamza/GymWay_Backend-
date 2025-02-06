import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/staff')
  async loginStaff(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateStaff(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.loginStaff(user);
  }

  @Post('login/member')
  async loginMember(@Body() loginDto: { email: string; password: string }) {
    const member = await this.authService.validateMember(
      loginDto.email,
      loginDto.password,
    );
    if (!member) {
      throw new UnauthorizedException();
    }
    return this.authService.loginMember(member);
  }
} 