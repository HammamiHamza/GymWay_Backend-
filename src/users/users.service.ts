/*import { Injectable } from '@nestjs/common';


@Injectable()
export class UsersService {

    findAll(): string[] {
        return ['User 1', 'User 2'];
      }
    
}*/


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /*findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }*/
}
