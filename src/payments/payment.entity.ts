import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
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
  paymentMethod: 'cash' | 'card' | 'online' | 'paypal';

  @Column()
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn()
  paymentDate: Date;

  @Column({ nullable: true })
  paypalOrderId: string;

  @Column({ type: 'json', nullable: true })
  paypalResponse: any;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  validUntil: Date;
}
