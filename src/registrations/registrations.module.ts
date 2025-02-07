import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';
import { Member } from '../members/member.entity';
import { MembershipType } from '../membership-types/membership-type.entity';
import { User } from 'src/users/user.entity';
import { Session } from '../sessions/session.entity';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Registration, Member, MembershipType, User, Session]),
    SessionsModule,
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}
