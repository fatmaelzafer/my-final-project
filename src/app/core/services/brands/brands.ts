import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Iresult } from '../../../shared/models/result/iresult.interface';
import { Ibrand } from '../../../shared/models/brands/ibrand.interface';

@Injectable({
  providedIn: 'root',
})
export class Brands {
  constructor(private readonly http:HttpClient){

  }
  apiUrl:string =environment.apiUrl;
  getAllbrands():Observable<Iresult<Ibrand[]>>{
      return this.http.get<Iresult<Ibrand[]>>(this.apiUrl+'/brands');
    }
}
