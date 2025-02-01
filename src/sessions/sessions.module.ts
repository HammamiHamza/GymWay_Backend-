import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';
import { Member } from '../members/member.entity';  // Importer l'entité membre

@Module({
  imports: [TypeOrmModule.forFeature([Session, Member])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
