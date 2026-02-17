import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Checkout {
  private baseUrl = 'https://your-api.com/api/v1';

  checkoutResponse = signal<any>(null);
  loading = signal(false);

  constructor(private http: HttpClient) {}

  createCheckoutSession(cartId: string, shippingAddress: any) {

  return this.http.post(
    `${this.baseUrl}/orders/checkout-session/${cartId}`,
    { shippingAddress },
    {
      headers: {
        token: localStorage.getItem('token') || ''
      }
    }
  );

}

}
