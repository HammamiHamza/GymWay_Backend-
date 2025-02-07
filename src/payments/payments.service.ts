import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Payment } from './payment.entity';
import { PaypalService } from './services/paypal.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private paypalService: PaypalService
  ) {}

  create(payment: Partial<Payment>): Promise<Payment> {
    return this.paymentsRepository.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id }
    });
    if (!payment) {
      throw new NotFoundException(`Payment #${id} not found`);
    }
    return payment;
  }

  async getActivePayment(memberId: number): Promise<Payment | null> {
    const now = new Date();
    return this.paymentsRepository.findOne({
      where: {
        member: { id: memberId },
        status: 'completed',
        paymentDate: MoreThan(now)
      }
    });
  }

  async checkMemberAccess(memberId: number): Promise<boolean> {
    try {
      const activePayment = await this.getActivePayment(memberId);
      return !!activePayment;
    } catch (error) {
      console.error('Error checking member access:', error);
      return false;
    }
  }

  remove(id: number): Promise<void> {
    return this.paymentsRepository.delete(id).then(() => {});
  }
}
