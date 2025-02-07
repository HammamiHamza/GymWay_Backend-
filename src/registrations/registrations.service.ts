import { Injectable, BadRequestException } from '@nestjs/common';
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
    private sessionRepository: Repository<Session>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async registerForSession(memberId: number, sessionId: number): Promise<Registration> {
    // Find the session
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['registrations']
    });

    if (!session) {
      throw new BadRequestException('Session not found');
    }

    // Check session capacity
    if (session.registrations.length >= session.capacity) {
      throw new BadRequestException('Session is full');
    }

    // Find the member
    const member = await this.memberRepository.findOne({
      where: { id: memberId }
    });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    // Check if member is already registered
    const existingRegistration = await this.registrationsRepository.findOne({
      where: {
        member: { id: memberId },
        session: { id: sessionId },
        status: 'confirmed'
      }
    });

    if (existingRegistration) {
      throw new BadRequestException('Already registered for this session');
    }

    // Create new registration
    const registration = this.registrationsRepository.create({
      member,
      session,
      status: 'confirmed',
      registrationDate: new Date()
    });

    return this.registrationsRepository.save(registration);
  }

  async getRegistrationsForMember(memberId: number): Promise<Registration[]> {
    return this.registrationsRepository.find({
      where: { member: { id: memberId } },
      relations: ['session', 'session.instructor'],
      order: { registrationDate: 'DESC' }
    });
  }

  async cancelRegistration(registrationId: number, memberId: number): Promise<void> {
    const registration = await this.registrationsRepository.findOne({
      where: { 
        id: registrationId,
        member: { id: memberId }
      }
    });

    if (!registration) {
      throw new BadRequestException('Registration not found');
    }

    registration.status = 'cancelled';
    await this.registrationsRepository.save(registration);
  }
}