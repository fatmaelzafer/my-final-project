import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('userToken')!;
  if(!token){
    return next(req);
  }
  const newreq = req.clone({
    setHeaders:{
      token:token
    }
  })
  return next(newreq);
  
};
