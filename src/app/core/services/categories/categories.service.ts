import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Iresult } from '../../../shared/models/result/iresult.interface';
import { Icategory } from '../../../shared/models/categories/icategory.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly http:HttpClient){

  }
  apiUrl:string =environment.apiUrl;
  getAllcategories():Observable<Iresult<Icategory[]>>{
      return this.http.get<Iresult<Icategory[]>>(this.apiUrl+'/categories');
    }
}
