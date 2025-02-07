import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Request() req, @Body() data: { sessionId: number }): Promise<Registration> {
    return this.registrationsService.registerForSession(req.user.id, data.sessionId);
  }

  @Get('user')
  getUserRegistrations(@Request() req): Promise<Registration[]> {
    return this.registrationsService.getRegistrationsForUser(req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req, @Param('id') id: number): Promise<void> {
    return this.registrationsService.remove(id);
  }
}