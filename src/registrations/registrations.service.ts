import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepository: Repository<Registration>,
  ) {}

  create(registration: Partial<Registration>): Promise<Registration> {
    return this.registrationsRepository.save(registration);
  }

  findAll(): Promise<Registration[]> {
    return this.registrationsRepository.find();
  }

  /*findOne(id: number): Promise<Registration> {
    return this.registrationsRepository.findOne(id);
  }*/

  remove(id: number): Promise<void> {
    return this.registrationsRepository.delete(id).then(() => {});
  }
}
