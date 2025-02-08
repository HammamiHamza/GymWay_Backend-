import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PaymentsService } from 'src/payments/payments.service';


@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post('session/:sessionId')
  async registerForSession(
    @Request() req,
    @Param('sessionId') sessionId: number
  ) {
    return this.registrationsService.registerForSession(req.user.id, sessionId);
  }

  @Get('my-registrations')
  async getMyRegistrations(@Request() req) {
    return this.registrationsService.getRegistrationsForMember(req.user.id);
  }

  @Delete(':id')
  async cancelRegistration(
    @Request() req,
    @Param('id') registrationId: number
  ) {
    return this.registrationsService.cancelRegistration(registrationId, req.user.id);
  }

  @Post('with-payment')
  async registerWithPayment(
    @Body() body: { userId: number; sessionId: number; amount: number },
  ): Promise<any> {
    const { userId, sessionId, amount } = body;
    
    // 1. Créer l'inscription
    const registration = await this.registrationsService.registerForSession(userId, sessionId);
    
    // 2. Créer le PaymentIntent pour le montant à payer
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      amount, // montant en centimes (ex : 2000 pour 20€)
      'eur',
      { registrationId: registration.id } // Metadonnées pour lier le PaymentIntent à l'inscription
    );
    
    // Vous pouvez également enregistrer un paiement dans votre table Payment ici
    // en utilisant PaymentsService.create(...) pour créer un enregistrement
    
    // Retourner l'inscription et le clientSecret afin que le frontend puisse finaliser le paiement
    return { registration, clientSecret: paymentIntent.client_secret };
  }
}