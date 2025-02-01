import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from '../members/member.entity';

@Entity()
export class MembershipType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeName: string;

  @OneToMany(() => Member, member => member.membershipType)
  members: Member[];
}
