import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ProductDetailsService } from '../../../core/services/product-details/product-details.service';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products-details',
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
 private readonly activatedRoute=inject(ActivatedRoute);
 private readonly productDetailsService=inject(ProductDetailsService);
 productid:string|null=null;
 product:WritableSignal<Iproduct | null>=signal<Iproduct|null>(null);
 private platformid = inject(PLATFORM_ID);
 ngOnInit():void{
 this.getproductid();
 if(isPlatformBrowser(this.platformid)){
      localStorage.setItem('pageUrl','/products')
     }
 }
 getproductid(){
 this.activatedRoute.paramMap.subscribe({
  next:(res)=>{
    this.productid=res.get('id');
    this.getproduct(this.productid);
  },
 })
 }
 getproduct(id:string|null){
  this.productDetailsService.getproductdetails(id).subscribe({
      next: (res) => {
       this.product.set(res.data);
      },error:(err)=>{

      }
    });
  }
}
