import { Component, inject, signal, WritableSignal , PLATFORM_ID} from '@angular/core';
import { CategoryCardComponent } from "../../../shared/components/category-card/category-card.component";
import { Icategory } from '../../../shared/models/categories/icategory.interface';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
 private readonly CategoriesService=inject(CategoriesService) ;
  private platformid = inject(PLATFORM_ID);
  ngOnInit():void{
     this.getcategories();
     if(isPlatformBrowser(this.platformid)){
      localStorage.setItem('pageUrl','/categories')
     }
    }
  
    categories : WritableSignal<Icategory[]>=signal<Icategory[]>([]);
  
  getcategories():void{
    this.CategoriesService.getAllcategories().subscribe({
      next: (res) => {
       this.categories.set(res.data);
      },error:(err)=>{

      }
    });
  }
}
