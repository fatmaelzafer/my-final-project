import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  

  transform(items:any[],searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm=searchTerm.toLowerCase();
    return items.filter(item => item.title.toLowerCase().includes(searchTerm));
    
    
  }

}
