import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Iresult } from '../../../../shared/models/result/iresult.interface';
import { Iproduct } from '../../../../shared/models/products/iproduct.interface';
@Injectable({ providedIn: 'root' })
export class CartService {

  private BASE_URL = environment.apiUrl;

  cartCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getCart():Observable<Iresult<Iproduct[]>> {
    return this.http.get<Iresult<Iproduct[]>>(`${this.BASE_URL}/cart`, {
    headers: {
      token: localStorage.getItem('token')!
    }
  }).pipe(
    tap((res: any) => {
      localStorage.setItem('cartId', res.cartId);
    })
  );
   
  }

  addToCart(productId: string):Observable<Iresult<Iproduct[]>> {
    return this.http.post<Iresult<Iproduct[]>>(`${this.BASE_URL}/cart`, { productId });
  }

  updateQuantity(productId: string, count: number):Observable<Iresult<Iproduct[]>>  {
    return this.http.put<Iresult<Iproduct[]>>(`${this.BASE_URL}/cart/${productId}`, { count });
  }

  removeItem(productId: string):Observable<Iresult<Iproduct[]>> {
    return this.http.delete<Iresult<Iproduct[]>>(`${this.BASE_URL}/cart/${productId}`);
  }

  clearCart() :Observable<Iresult<Iproduct[]>>{
    return this.http.delete<Iresult<Iproduct[]>>(`${this.BASE_URL}/cart`);
  }

  refreshCartCount() {
    this.getCart().subscribe((res: any) => {
      this.cartCount.next(res.numOfCartItems);
    });
  }
  checkout(cartId: string, shippingAddress: any) {

  return this.http.post(
    `${environment.apiUrl}/orders/checkout-session/${cartId}`,
    {
      shippingAddress
    }
  );

}


}
