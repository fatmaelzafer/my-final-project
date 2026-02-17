import { Component, Input, OnInit  } from '@angular/core';
import { Iproduct } from '../../models/products/iproduct.interface';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { ShortenPipe } from '../../../core/pipes/shorten/shorten-pipe';
import { ProductsService } from '../../../core/services/products/products.service';
import { CartService } from '../../../features/pages/cart/cart.component';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
 @Input({required:true}) p!:Iproduct;
 products: any[] = [];
  loadingProduct: string | null = null;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productsService.getAllproducts()
      .subscribe((res: any) => {
        this.products = res.data;
      });
  }

  addToCart(productId: string) {

    this.loadingProduct = productId;

    this.cartService.addToCart(productId)
      .subscribe({
        next: () => {

          this.loadingProduct = null;

          // update navbar cart count
          this.cartService.refreshCartCount();

        },
        error: () => {
          this.loadingProduct = null;
        }
      });

  }

}
