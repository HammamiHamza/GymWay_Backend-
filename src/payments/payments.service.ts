// src/payments/payments.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';
import { Payment } from './payment.entity';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private configService: ConfigService, // Injection du ConfigService
  ) {
    // Récupérer la clé Stripe depuis la configuration
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('La clé secrète Stripe (STRIPE_SECRET_KEY) n\'est pas définie');
    }
    // Initialisation de Stripe avec la clé récupérée
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-01-27.acacia',
    });
  }

  // Méthode pour créer et enregistrer un paiement dans la base de données
  async create(payment: Partial<Payment>): Promise<Payment> {
    const newPayment = this.paymentsRepository.create({
      ...payment,
      isActive: payment.status === 'completed',
      validUntil: this.calculateValidUntil(payment.paymentDate),
    });
    return this.paymentsRepository.save(newPayment);
  }

  // Méthode pour créer un PaymentIntent via Stripe
  async createPaymentIntent(
    amount: number,
    currency: string = 'eur',
    metadata?: any,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata,
      });
      return paymentIntent;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      relations: ['member'],
      order: { paymentDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['member'],
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
        validUntil: MoreThan(now),
      },
      relations: ['member'],
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
        validUntil: LessThanOrEqual(now),
      },
      {
        isActive: false,
      },
    );
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentsRepository.remove(payment);
  }

  private calculateValidUntil(startDate: Date): Date {
    const validUntil = new Date(startDate);
    validUntil.setMonth(validUntil.getMonth() + 1); // Validité par défaut d'1 mois
    return validUntil;
  }

  async findMemberPayments(memberId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { member: { id: memberId } },
      relations: ['member'],
      order: { paymentDate: 'DESC' },
    });
  }
}
