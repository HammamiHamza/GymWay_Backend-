import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from '../members/member.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, member => member.payments)
  member: Member;

  @Column()
  amount: number;

  @Column()
  paymentMethod: 'cash' | 'card' | 'online';

  @Column()
  status: 'pending' | 'completed' | 'failed';

  @Column()
  paymentDate: Date;
}
