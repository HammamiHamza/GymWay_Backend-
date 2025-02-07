import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { Member } from '../members/member.entity';
import { Session } from '../sessions/session.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepository: Repository<Registration>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async registerForSession(userId: number, sessionId: number): Promise<Registration> {
    const session = await this.sessionRepository.findOne({ 
      where: { id: sessionId }
    });
    
    if (!session) {
      throw new BadRequestException('Session not found');
    }

    const member = await this.memberRepository.findOne({
      where: { id: userId }
    });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    // Check if member is already registered
    const existingRegistration = await this.registrationsRepository.findOne({
      where: {
        member: { id: userId },
        session: { id: sessionId },
        status: 'confirmed'
      }
    });

    if (existingRegistration) {
      throw new BadRequestException('Already registered for this session');
    }

    const registration = this.registrationsRepository.create({
      member,
      session,
      status: 'confirmed',
      registrationDate: new Date()
    });

    return this.registrationsRepository.save(registration);
  }

  async getRegistrationsForUser(userId: number): Promise<Registration[]> {
    return this.registrationsRepository.find({
      where: { member: { id: userId } },
      relations: ['session'],
      order: { registrationDate: 'DESC' }
    });
  }

  async remove(id: number): Promise<void> {
    const registration = await this.registrationsRepository.findOne({
      where: { id }
    });
    
    if (!registration) {
      throw new BadRequestException('Registration not found');
    }

    await this.registrationsRepository.update(id, { status: 'cancelled' });
  }
}