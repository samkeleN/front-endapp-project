import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule] // ✅ Add HttpClientModule
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { // ✅ Inject HttpClient
    this.registerForm = this.fb.group({
      employeename: '',
      email: '',
      password: ''
    });
  }

  save() {
    if (this.registerForm.valid) {
      const bodyData = this.registerForm.value; // ✅ Get form values properly

      this.http.post('http://localhost:8090/api/v1/employee/save', bodyData, { responseType: "text" })
        .subscribe({
          next: (resultData: any) => {
            console.log("Response:", resultData);
            alert("Employee registered successfully");
          },
          error: (error) => {
            console.error("Error:", error);
            alert("Registration failed. Please try again.");
          }
        });
    } else {
      alert("Please fill in all required fields.");
    }
  }
}
