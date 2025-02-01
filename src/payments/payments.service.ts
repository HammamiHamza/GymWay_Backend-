import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  create(payment: Partial<Payment>): Promise<Payment> {
    return this.paymentsRepository.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  /*findOne(id: number): Promise<Payment> {
    return this.paymentsRepository.findOne(id);
  }*/

  remove(id: number): Promise<void> {
    return this.paymentsRepository.delete(id).then(() => {});
  }
}
