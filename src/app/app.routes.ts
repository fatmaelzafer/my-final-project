import { Routes } from '@angular/router';



import { authGuard } from './core/guards/auth/auth-guard';
import { userAuthGuard } from './core/guards/user-auth/user-auth-guard';


export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'', loadComponent:()=>import ('./core/layout/components/guest-layout/guest-layout.component').then((c)=>c.GuestLayoutComponent)
        ,children:[
            {path:'login',
                canActivate:[userAuthGuard],
                 loadComponent:()=>import ('./core/auth/login/login.component').then((c)=>c.LoginComponent)},
            {path:'signup',
                canActivate:[userAuthGuard],
                loadComponent:()=>import ('./core/auth/signup/signup.component').then((c)=>c.SignupComponent)}
        ]
     },
    {path:'',
         loadComponent:()=>import ('./core/layout/components/user-layout/user-layout.component').then((c)=>c.UserLayoutComponent)
        ,children:[
            {path:'home',
                canActivate:[authGuard]
                ,loadComponent:()=>import ('./features/pages/home/home.component').then((c)=>c.HomeComponent)},
            {path:'categories',
                canActivate:[authGuard],
                loadComponent:()=>import ('./features/pages/categories/categories.component').then((c)=>c.CategoriesComponent)},
            {path:'cart',
                canActivate:[authGuard],
                loadComponent:()=>import ('./features/pages/cart/cart.component').then((c)=>c.CartComponent)},
            {path:'checkout',
                canActivate:[authGuard],
                loadComponent:()=>import ('./features/pages/checkout/checkout').then((c)=>c.CheckoutComponent)},
            {path:'products',
                canActivate:[authGuard],
                loadComponent:()=>import ('./features/pages/products/products.component').then((c)=>c.ProductsComponent)},
            {path:'products-details/:id',
                canActivate:[authGuard],
                loadComponent:()=>import ('./features/pages/products-details/products-details.component').then((c)=>c.ProductsDetailsComponent)},
            {path:'brands',
                canActivate:[authGuard],
                loadComponent:()=>import ('./features/pages/brands/brands.component').then((c)=>c.BrandsComponent)} 
        ]
     },
     {path:'**',redirectTo:''}
    
];
