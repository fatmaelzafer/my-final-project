import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../../core/services/categories/categories.service';
import { Icategory } from '../../../../../shared/models/categories/icategory.interface';
import { CategoryCardComponent } from "../../../../../shared/components/category-card/category-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-section',
  imports: [CategoryCardComponent, CarouselModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent {
  private readonly CategoriesService=inject(CategoriesService) ;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  slidesStore = signal<any[]>([
    { id: 'slide-1', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1' },
    { id: 'slide-2', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2' },
    { id: 'slide-3', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3' },
    { id: 'slide-4', text: 'Slide 4 HM', width: 450, dotContent: 'text4' },
    { id: 'slide-5', text: 'Slide 5 HM', dataMerge: 2, width: 500, dotContent: 'text5' },
    { id: 'slide-6', text: 'Slide 6', width: 500, dotContent: 'text5' },
    { id: 'slide-7', text: 'Slide 7', width: 500, dotContent: 'text6' },
    { id: 'slide-8', text: 'Slide 8', width: 500, dotContent: 'text8' },
    // { id: 'slide-7', text: 'Slide 7', dotContent: 'text5'},
    // { id: 'slide-8', text: 'Slide 8', dotContent: 'text5'},
    // { id: 'slide-9', text: 'Slide 9', dotContent: 'text5'},
    // { id: 'slide-10', text: 'Slide 10', dotContent: 'text5'},
  ]);
  
    ngOnInit():void{
     this.getcategories();
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
