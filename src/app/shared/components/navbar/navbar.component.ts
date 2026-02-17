import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router:Router){}
 @Input({required:true})isuser:boolean=false;
 pages=[
 {name:'Home',link:'/home'},
 {name:'Brands',link:'/brands' },
 {name:'Categories',link:'/categories'},
 {name:'Products' ,link:'/products'}
 ]
 signout(){
  localStorage.removeItem('userToken');
  this.router.navigate(['/login']);
 }
}
