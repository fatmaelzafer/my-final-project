import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../core/pipes/search/search-pipe';


@Component({
  selector: 'app-products',
  imports: [ProductCardComponent,NgxPaginationModule,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
 private readonly ProductsService=inject(ProductsService);
  products : WritableSignal<Iproduct[]>=signal<Iproduct[]>([]);
  totalnumberofproducts:WritableSignal<number>=signal<number>(0);
  searchText:string='';
  page:number=1;
  ngOnInit():void{
    this.getproducts(this.page);  
  }
  getproducts(page:number){
    this.ProductsService.getAllproducts(page).subscribe({
      next: (res) => {
        this.totalnumberofproducts.set(res.results);
       this.products.set(res.data);
      },error:(err)=>{

      }
    });
  }
  changepage(newpage:number):void{
    this.page=newpage;
    this.getproducts(this.page);
  }
  
}
