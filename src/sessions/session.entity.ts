import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Registration } from '../registrations/registration.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionName: string;

  @ManyToOne(() => User, user => user.sessions)
  instructor: User;

  @OneToMany(() => Registration, registration => registration.session)
  registrations: Registration[];
}
