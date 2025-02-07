import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('session/:sessionId')
  async registerForSession(
    @Request() req,
    @Param('sessionId') sessionId: number
  ) {
    return this.registrationsService.registerForSession(req.user.id, sessionId);
  }

  @Get('my-registrations')
  async getMyRegistrations(@Request() req) {
    return this.registrationsService.getRegistrationsForMember(req.user.id);
  }

  @Delete(':id')
  async cancelRegistration(
    @Request() req,
    @Param('id') registrationId: number
  ) {
    return this.registrationsService.cancelRegistration(registrationId, req.user.id);
  }
}