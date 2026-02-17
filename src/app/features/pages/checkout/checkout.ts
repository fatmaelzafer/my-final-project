import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CartService } from '../cart/cart.component';
import { Checkout } from '../../../core/services/checkout/checkout';


@Component({
  selector: 'app-chechout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {

  
  private fb = inject(FormBuilder);
  private checkoutService = inject(Checkout);
   loading = this.checkoutService.loading; 

  form = new FormGroup({

    details:new FormControl('', [Validators.required]),

    phone:new FormControl ('', [Validators.required]),

    city:new FormControl ('', [Validators.required])

  });

  cartId = signal(localStorage.getItem('cartId') || '');

  submit() {

    if (this.form.invalid) return;

    this.checkoutService.createCheckoutSession(
      this.cartId(),
      this.form.value
    ).subscribe({

      next: (res: any) => {

        this.checkoutService.loading.set(false);

        console.log(res);


        if (res.session?.url) {
          window.location.href = res.session.url;
        }

      },

      error: (err) => {
        this.checkoutService.loading.set(false);
        console.error(err);
      }

    });

  }
}
