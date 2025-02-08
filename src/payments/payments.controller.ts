import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() payment: Payment): Promise<Payment> {
    return this.paymentsService.create(payment);
  }

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }*/

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.paymentsService.remove(id);
  }

  @Post()
  async createPayment(@Body() body: { amount: number; currency?: string; registrationId?: number }) {
    const { amount, currency, registrationId } = body;
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      amount,
      currency,
      { registrationId },
    );
    // On renvoie le clientSecret afin que le frontend puisse l'utiliser
    return { clientSecret: paymentIntent.client_secret };
  }


}
