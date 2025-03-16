import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`, // ✅ Load components via routing
  imports: [RouterOutlet] // ✅ Add RouterOutlet for dynamic component loading
})
export class AppComponent {
  title = 'front-endapp-project';
}
