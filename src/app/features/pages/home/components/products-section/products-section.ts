import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../../core/services/products/products.service';
import { Iproduct } from '../../../../../shared/models/products/iproduct.interface';
import { ProductCardComponent } from "../../../../../shared/components/product-card/product-card.component";



@Component({
  selector: 'app-products-section',
  imports: [ProductCardComponent],
  templateUrl: './products-section.html',
  styleUrl: './products-section.css',
})
export class ProductsSection {
  private readonly ProductsService=inject(ProductsService);
  
  products : WritableSignal<Iproduct[]>=signal<Iproduct[]>([]);
  ngOnInit():void{
    this.getproducts();
    
  }
  getproducts():void{
    this.ProductsService.getAllproducts(1).subscribe({
      next: (res) => {
       this.products.set(res.data);
      },error:(err)=>{

      }
    });
  }
}
