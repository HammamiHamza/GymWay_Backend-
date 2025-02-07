import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { SessionsModule } from './sessions/sessions.module';
import { PaymentsModule } from './payments/payments.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { MembershipTypesModule } from './membership-types/membership-types.module';
import { User } from './users/user.entity';
import { Member } from './members/member.entity';
import { Session } from './sessions/session.entity';
import { Payment } from './payments/payment.entity';
import { Registration } from './registrations/registration.entity';
import { MembershipType } from './membership-types/membership-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Remplace par 'mysql' si tu utilises MySQL
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: 'postgres', 
      database: 'gym_db',
      entities: [User, Member, Session, Payment, Registration, MembershipType],
      synchronize: true,  // N'utilise pas en production pour éviter la perte de données
    }),
    UsersModule,
    MembersModule,
    SessionsModule,
    PaymentsModule,
    RegistrationsModule,
    MembershipTypesModule,
  ],
})
export class AppModule {}














// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [UsersModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
