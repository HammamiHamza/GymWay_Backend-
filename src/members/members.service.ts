import { Injectable } from '@nestjs/common';
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

  async create(memberData: Partial<Member>): Promise<Member> {
    if (memberData.password) {
      const salt = await bcrypt.genSalt();
      memberData.password = await bcrypt.hash(memberData.password, salt);
    }
    return this.membersRepository.save(memberData);
  }

  findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

 /* findOne(id: number): Promise<Member> {
    return this.membersRepository.findOne(id);
  }*/

  remove(id: number): Promise<void> {
    return this.membersRepository.delete(id).then(() => {});
  }
}
