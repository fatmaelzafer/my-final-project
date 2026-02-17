
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './core/services/flowbiteservice/flowbite.service';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerComponent } from "ngx-spinner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('finalproject');
  private platformid=inject(PLATFORM_ID);
   constructor(private flowbiteService: FlowbiteService) {}
  
  ngOnInit(): void {
    if(this.platformid){
      const token=localStorage.getItem('userToken')!;
      if(token){
        const decoded = jwtDecode(token);
      }
    
    }
    
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
