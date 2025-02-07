import { Controller, Get, Post, Body, Param, Delete, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PaymentsService } from '../payments/payments.service';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly paymentsService: PaymentsService
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
    
    const hasAccess = await this.paymentsService.checkMemberAccess(req.user.id);
    if (!hasAccess) {
      throw new UnauthorizedException('Active payment required to view sessions');
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
}
