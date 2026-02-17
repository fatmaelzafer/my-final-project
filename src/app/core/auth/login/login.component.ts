import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, AbstractControl, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Isignin } from '../../../shared/models/signin/isignin';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginform!: FormGroup;
  isloading: WritableSignal<boolean> = signal<boolean>(false);
  errormessage: WritableSignal<string> = signal<string>('');
  constructor(public readonly authservice: AuthService, private readonly route: Router) { }
  //signupuser$!: Observable<any>;
  authsubscribe !: Subscription;
  
  ngOnInit() {
    this.intaiform();
  }
  intaiform() {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g)]),

    },
    );
  }
  login() {
    this.authsubscribe?.unsubscribe();
    this.errormessage.set('');
    if (this.loginform.valid) {
      //this.signupuser$= this.authservice.singup(this.signupform.value);
      this.isloading.set(true);
      const data: Partial<Isignin> = this.loginform.value;
      this.authsubscribe = this.authservice.login(data).subscribe({
        next: (res) => {
          this.isloading.set(false);
          localStorage.setItem('userToken',res.token);
          setTimeout(() => {
            this.route.navigate(['/home']);
          }, 3000);

        },
        error: (err) => {
          this.errormessage.set(err.error.message)
          this.isloading.set(false);
        },
      });
    }
    else {
      this.loginform.markAllAsTouched();
    }
  }
}
