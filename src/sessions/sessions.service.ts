import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  create(session: Partial<Session>): Promise<Session> {
    return this.sessionsRepository.save(session);
  }

  findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  findOne(id: number): Promise<Session> {
    return this.sessionsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.sessionsRepository.delete(id);
  }
}
