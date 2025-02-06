import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/user.entity';
import { Session } from '../sessions/session.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User CRUD
  @Post('users')
  createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.adminService.createUser(userData);
  }

  @Get('users')
  findAllUsers(): Promise<User[]> {
    return this.adminService.findAllUsers();
  }

  @Get('users/:id')
  findOneUser(@Param('id') id: number): Promise<User> {
    return this.adminService.findOneUser(id);
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: number): Promise<void> {
    return this.adminService.removeUser(id);
  }

  // Session CRUD
  @Post('sessions')
  createSession(@Body() sessionData: Partial<Session>): Promise<Session> {
    return this.adminService.createSession(sessionData);
  }

  @Get('sessions')
  findAllSessions(): Promise<Session[]> {
    return this.adminService.findAllSessions();
  }

  @Get('sessions/:id')
  findOneSession(@Param('id') id: number): Promise<Session> {
    return this.adminService.findOneSession(id);
  }

  @Delete('sessions/:id')
  removeSession(@Param('id') id: number): Promise<void> {
    return this.adminService.removeSession(id);
  }
} 