import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';
import { Member } from '../members/member.entity';
import { MembershipType } from '../membership-types/membership-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registration, Member, MembershipType])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
