import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Registration } from '../registrations/registration.entity';
import { MembershipType } from '../membership-types/membership-type.entity';
import { Payment } from '../payments/payment.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  birthDate: Date;

  @ManyToOne(() => MembershipType, membershipType => membershipType.members)
  membershipType: MembershipType;

  @OneToMany(() => Registration, registration => registration.member)
  registrations: Registration[];

  @Column()
  password: string;

  @Column({ default: 'inactive' })
  membershipStatus: 'active' | 'inactive';

  @Column({ nullable: true })
  membershipExpiry: Date;

  @OneToMany(() => Payment, payment => payment.member)
  payments: Payment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  lastLoginDate: Date;
}
