import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isScrolled = false;
  pageNames: string[] = [
    'Home',
    'Registration',
    'AMT'
  ]

  constructor(
    private _router: Router
  ){}

  navigateToPage(event: Event): void{
    const target: HTMLElement = event.target as HTMLElement
    let pageName: string = target.innerText.toLowerCase().trim()
    pageName = pageName !== 'amt' ? pageName : 'attendance-monitoring-tool'
    
    this._router.navigate([pageName])
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 0;
  }
}
