import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Server
  },
  {
    path: 'signup',
    renderMode: RenderMode.Server
  },
  {
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: 'categories',
    renderMode: RenderMode.Server
  },
  {
    path: 'cart',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Server
  },
  {
    path: 'products',
    renderMode: RenderMode.Server
  },
  {
    path: 'products-details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'brands',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
