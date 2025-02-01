import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Payment } from '../payments/payment.entity';
import { Registration } from '../registrations/registration.entity';
import { MembershipType } from '../membership-types/membership-type.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  birthDate: Date;

  @ManyToOne(() => MembershipType, membershipType => membershipType.members)
  membershipType: MembershipType;

  @OneToMany(() => Payment, payment => payment.member)
  payments: Payment[];

  @OneToMany(() => Registration, registration => registration.member)
  registrations: Registration[];
}
