import { Controller, Get, Post, Put, Body, Param, Delete, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
  ) {}

  @Post()
  create(@Body() session: Session): Promise<Session> {
    return this.sessionsService.create(session);
  }

  @Get()
  async findAll(@Request() req): Promise<Session[]> {
    if (req.user.role === 'admin') {
      return this.sessionsService.findAll();
    }
    
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

  @Put(':id')
  update(@Param('id') id: number, @Body() session: Partial<Session>): Promise<Session> {
    return this.sessionsService.update(id, session);
  }
}
