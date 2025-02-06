import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() session: Session): Promise<Session> {
    return this.sessionsService.create(session);
  }

  @Get()
  findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: number): Promise<Session> {
    return this.sessionsService.findOne(id);
  }*/

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sessionsService.remove(id);
  }
}
