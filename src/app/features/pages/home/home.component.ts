import { Component } from '@angular/core';
import { ProductsSection } from "./components/products-section/products-section";
import { CategoriesSectionComponent } from "./components/categories-section/categories-section.component";

@Component({
  selector: 'app-home',
  imports: [ProductsSection, CategoriesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
