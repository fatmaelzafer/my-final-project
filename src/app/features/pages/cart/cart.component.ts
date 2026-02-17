import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { CartService } from './services/cart.service';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';
import { Router } from '@angular/router';


@Component({
  templateUrl: './cart.component.html'
})
export class CartComponent {

  cart = signal<any>({
    products: [],
    totalCartPrice: 0
  });
  loading = signal(true);


  constructor(
    private cartService: CartService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {

    this.loading.set(true);

    this.cartService.getCart().subscribe({
      next: (res: any) => {

        this.cart.set({
          products: res.data.products,
          totalCartPrice: res.data.totalCartPrice
        });

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });

  }

  remove(productId: string) {

    this.cartService.removeItem(productId)
      .subscribe(() => this.loadCart());

  }

  update(productId: string, count: number) {

    if (count < 1) return;

    this.cartService.updateQuantity(productId, count)
      .subscribe(() => this.loadCart());

  }

  clear() {

    this.cartService.clearCart()
      .subscribe(() => this.loadCart());

  }
  goToCheckout() {

    this.router.navigate(['/checkout']);

  }



}

export { CartService };

