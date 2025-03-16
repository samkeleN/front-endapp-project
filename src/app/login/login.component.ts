import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // ✅ Email validation added
      password: ['', Validators.required] // ✅ Password is required
    });
  }

  login() {
    if (this.loginForm.valid) {
      const bodyData = this.loginForm.value;

      this.http.post<any>('http://localhost:8090/api/v1/employee/login', bodyData)
        .subscribe({
          next: (resultData) => {
            console.log("Response:", resultData);

            // ✅ Ensure API response contains success flag
            if (resultData.status === true) {
              alert("Login successful");

               // ✅ Store authentication token (if provided)
               if (resultData.token) {
                 localStorage.setItem('authToken', resultData.token);
               }

              //  ✅ Redirect to dashboard
              this.router.navigate(['/dashboard']);
            } else {
              alert("Invalid email or password");
            }
          },
          error: (error) => {
            console.error("Error:", error);
            alert("Login failed. Please check your credentials and try again.");
          }
        });
    } else {
      alert("Please fill in all required fields.");
    }
  }
}
