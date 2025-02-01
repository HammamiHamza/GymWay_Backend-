import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from '../members/member.entity';
import { Session } from '../sessions/session.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, member => member.registrations)
  member: Member;

  @ManyToOne(() => Session, session => session.registrations)
  session: Session;

  @Column()
  registrationDate: Date;

  @Column()
  status: 'confirmed' | 'cancelled';
}
