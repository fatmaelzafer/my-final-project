import { Component, Input } from '@angular/core';
import { Ibrand } from '../../models/brands/ibrand.interface';

@Component({
  selector: 'app-brand-card',
  imports: [],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css',
})
export class BrandCardComponent {
@Input({required:true}) b!:Ibrand;
}
