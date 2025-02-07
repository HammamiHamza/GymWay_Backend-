import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  private client: checkoutNodeJssdk.PayPalHttpClient;

  constructor(private configService: ConfigService) {
    const environment = this.configService.get('PAYPAL_ENVIRONMENT') === 'production'
      ? new checkoutNodeJssdk.core.LiveEnvironment(
          this.configService.get('PAYPAL_CLIENT_ID'),
          this.configService.get('PAYPAL_CLIENT_SECRET')
        )
      : new checkoutNodeJssdk.core.SandboxEnvironment(
          this.configService.get('PAYPAL_CLIENT_ID'),
          this.configService.get('PAYPAL_CLIENT_SECRET')
        );

    this.client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);
  }

  async createOrder(amount: number, currency: string = 'USD'): Promise<any> {
    try {
      const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toString()
          }
        }]
      });

      const order = await this.client.execute(request);
      return order.result;
    } catch (error) {
      throw new HttpException(
        'Failed to create PayPal order',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async capturePayment(orderId: string): Promise<any> {
    try {
      const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});
      const capture = await this.client.execute(request);
      return capture.result;
    } catch (error) {
      throw new HttpException(
        'Failed to capture PayPal payment',
        HttpStatus.BAD_REQUEST
      );
    }
  }
} 