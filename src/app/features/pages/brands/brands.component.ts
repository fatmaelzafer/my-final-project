import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Ibrand } from '../../../shared/models/brands/ibrand.interface';
import { isPlatformBrowser } from '@angular/common';
import { Brands } from '../../../core/services/brands/brands';
import { BrandCardComponent } from "../../../shared/components/brand-card/brand-card.component";


@Component({
  selector: 'app-brands',
  imports: [BrandCardComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
private readonly brandsService=inject(Brands) ;
  private platformid = inject(PLATFORM_ID);
  ngOnInit():void{
     this.getbrands();
     if(isPlatformBrowser(this.platformid)){
      localStorage.setItem('pageUrl','/categories')
     }
    }
  
    brands : WritableSignal<Ibrand[]>=signal<Ibrand[]>([]);
  
  getbrands():void{
    this.brandsService.getAllbrands().subscribe({
      next: (res) => {
       this.brands.set(res.data);
      },error:(err)=>{

      }
    });
  }
}
