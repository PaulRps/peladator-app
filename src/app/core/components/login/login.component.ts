import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  error: any;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    if (this.authService.currentToken) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required /* , Validators.maxLength(4), Validators.maxLength(7) */]),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      userName: this.f.name.value,
      password: this.f.password.value,
    };

    this.authService
      .login(user)
      // .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = true;
          // this.loading = false;
        }
      );
  }
}
