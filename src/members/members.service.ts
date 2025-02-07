import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async findByEmail(email: string): Promise<Member> {
    return this.membersRepository.findOne({ where: { email } });
  }

  async create(member: Partial<Member>): Promise<Member> {
    const newMember = this.membersRepository.create(member);
    return this.membersRepository.save(newMember);
  }

  async findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.membersRepository.findOne({
      where: { id }
    });
    
    if (!member) {
      throw new NotFoundException(`Member #${id} not found`);
    }
    
    return member;
  }

  async update(memberData: Partial<Member>): Promise<Member> {
    if (!memberData.id) {
      throw new Error('Member ID is required for update');
    }

    const member = await this.findOne(memberData.id);
    const updatedMember = {
      ...member,
      ...memberData,
      updatedAt: new Date()
    };

    await this.membersRepository.save(updatedMember);
    return this.findOne(memberData.id);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.membersRepository.remove(member);
  }
}
