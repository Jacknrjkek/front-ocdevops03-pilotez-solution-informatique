import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  @Output() logoutEvent = new EventEmitter<void>();

  // If used directly in header
  private router = inject(Router);

  onLogout() {
    this.logoutEvent.emit();
  }
}
