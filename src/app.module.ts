import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { SessionsModule } from './sessions/sessions.module';
import { PaymentsModule } from './payments/payments.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { MembershipTypesModule } from './membership-types/membership-types.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Member } from './members/member.entity';
import { Session } from './sessions/session.entity';
import { Payment } from './payments/payment.entity';
import { Registration } from './registrations/registration.entity';
import { MembershipType } from './membership-types/membership-type.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available throughout the app
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // Remplace par 'mysql' si tu utilises MySQL
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: '', 
      database: 'gym_db',
      autoLoadEntities: true,
      synchronize: true,  // N'utilise pas en production pour éviter la perte de données
    }),
    AuthModule,
    UsersModule,
    MembersModule,
    SessionsModule,
    PaymentsModule,
    RegistrationsModule,
    MembershipTypesModule,
    AdminModule,
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
