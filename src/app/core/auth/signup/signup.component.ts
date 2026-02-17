import { Component, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { SignupData } from '../../../shared/models/signup/isignup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupform!: FormGroup;
  isloading: WritableSignal<boolean> = signal<boolean>(false);
  constructor(public readonly authservice: AuthService, private readonly route: Router) { }
  //signupuser$!: Observable<any>;
  authsubscribe !:Subscription;
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.valid;
    const repassword = group.get('rePassword')?.valid;
    if (password === repassword) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }
  ngOnInit(){
    this.intaiform();
  }
  intaiform() {
    this.signupform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g)]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

    },
      { validators: this.confirmPassword },
);
  }
  singup() {
    this.authsubscribe?.unsubscribe();
    if (this.signupform.valid) {
      //this.signupuser$= this.authservice.singup(this.signupform.value);
      this.isloading.set(true);
      const data: Partial<SignupData> = this.signupform.value;
      this.authsubscribe=this.authservice.singup(data).subscribe({
        next: (res) => {
          this.isloading.set(false);
          localStorage.setItem('userToken',res.token);
          
            this.route.navigate(['/home']);
          

        },
        error: (err) => {
          this.isloading.set(false);
        },
      });
    }
    else {
      this.signupform.markAllAsTouched();
    }
  }
}
