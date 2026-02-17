import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iresult } from '../../../shared/models/result/iresult.interface';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  apiUrl:string =environment.apiUrl;
    constructor(private readonly http:HttpClient){
  
    }
    getproductdetails(id:string|null):Observable<{data:Iproduct}>{
      return this.http.get<{data:Iproduct}>(this.apiUrl+`/products/${id}`)
    }
}
