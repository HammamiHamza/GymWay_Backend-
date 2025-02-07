import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';
import { Payment } from './payment.entity';
import { Member } from '../members/member.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>
  ) {}

  async create(payment: Partial<Payment>): Promise<Payment> {
    const newPayment = this.paymentsRepository.create({
      ...payment,
      isActive: payment.status === 'completed',
      validUntil: this.calculateValidUntil(payment.paymentDate)
    });
    return this.paymentsRepository.save(newPayment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      relations: ['member'],
      order: { paymentDate: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['member']
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
        isActive: true,
        validUntil: MoreThan(now)
      },
      relations: ['member']
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

  async deactivateExpiredPayments(): Promise<void> {
    const now = new Date();
    await this.paymentsRepository.update(
      {
        isActive: true,
        validUntil: LessThanOrEqual(now)
      },
      {
        isActive: false
      }
    );
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentsRepository.remove(payment);
  }

  private calculateValidUntil(startDate: Date): Date {
    const validUntil = new Date(startDate);
    validUntil.setMonth(validUntil.getMonth() + 1); // Default to 1 month validity
    return validUntil;
  }

  async findMemberPayments(memberId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { member: { id: memberId } },
      relations: ['member'],
      order: { paymentDate: 'DESC' }
    });
  }
}
