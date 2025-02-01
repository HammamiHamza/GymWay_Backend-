import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  create(member: Partial<Member>): Promise<Member> {
    return this.membersRepository.save(member);
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
