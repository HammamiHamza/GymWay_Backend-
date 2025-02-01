import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipType } from './membership-type.entity';

@Injectable()
export class MembershipTypesService {
  constructor(
    @InjectRepository(MembershipType)
    private membershipTypesRepository: Repository<MembershipType>,
  ) {}

  create(membershipType: Partial<MembershipType>): Promise<MembershipType> {
    return this.membershipTypesRepository.save(membershipType);
  }

  findAll(): Promise<MembershipType[]> {
    return this.membershipTypesRepository.find();
  }

 /* findOne(id: number): Promise<MembershipType> {
    return this.membershipTypesRepository.findOne(id);
  }*/

  remove(id: number): Promise<void> {
    return this.membershipTypesRepository.delete(id).then(() => {});
  }
}
