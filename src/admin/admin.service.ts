import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SessionsService } from '../sessions/sessions.service';
import { User } from '../users/user.entity';
import { Session } from '../sessions/session.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  // User CRUD
  createUser(userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  findOneUser(id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  removeUser(id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  // Session CRUD
  createSession(sessionData: Partial<Session>): Promise<Session> {
    return this.sessionsService.create(sessionData);
  }

  findAllSessions(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  findOneSession(id: number): Promise<Session> {
    return this.sessionsService.findOne(id);
  }

  removeSession(id: number): Promise<void> {
    return this.sessionsService.remove(id);
  }
} 