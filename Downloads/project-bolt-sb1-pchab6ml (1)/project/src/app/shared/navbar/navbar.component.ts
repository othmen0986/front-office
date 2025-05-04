import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fadeAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav [class.scrolled]="isScrolled" [class.menu-open]="menuOpen">
      <div class="container">
        <div class="logo">
          <a routerLink="/">FCR <span>CarHabty</span></a>
        </div>
        <div class="nav-toggle" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav-links" [class.show]="menuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Accueil</a></li>
          <li class="dropdown">
            <a (click)="toggleDropdown()" class="dropdown-toggle">Services</a>
            <ul class="dropdown-menu" [class.show]="dropdownOpen">
              <li><a routerLink="/services/credit" routerLinkActive="active" (click)="closeMenu()">Crédit</a></li>
              <li><a routerLink="/services/credit-payment" routerLinkActive="active" (click)="closeMenu()">Paiements Crédit</a></li>
              <li><a routerLink="/services/payment" routerLinkActive="active" (click)="closeMenu()">Paiement</a></li>
              <li><a routerLink="/services/insurance" routerLinkActive="active" (click)="closeMenu()">Microassurance</a></li>
              <li><a routerLink="/services/parts" routerLinkActive="active" (click)="closeMenu()">Pièces Détachées</a></li>
              <li><a routerLink="/services/expertise" routerLinkActive="active" (click)="closeMenu()">Expertise</a></li>
              <li><a routerLink="/services/vehicles" routerLinkActive="active" (click)="closeMenu()">Véhicules</a></li>
            </ul>
          </li>
          <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>
          <li><a href="#" class="cta-button">Commencer maintenant</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 20px 0;
      z-index: 1000;
      transition: all 0.3s ease;
      background: rgba(25, 25, 25, 0.1);
      backdrop-filter: blur(5px);
    }
    
    nav.scrolled {
      background: rgba(26, 43, 71, 0.95);
      padding: 15px 0;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo a {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
    }
    
    .logo span {
      color: #4da1ff;
      margin-left: 5px;
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-links li {
      margin-left: 30px;
      position: relative;
    }
    
    .nav-links a {
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      transition: all 0.3s ease;
      position: relative;
      padding: 5px 0;
    }
    
    .nav-links a:hover, .nav-links a.active {
      color: #4da1ff;
    }
    
    .nav-links a:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #4da1ff;
      transition: width 0.3s ease;
    }
    
    .nav-links a:hover:after, .nav-links a.active:after {
      width: 100%;
    }
    
    .cta-button {
      background: linear-gradient(45deg, #3d84ff, #4da1ff);
      padding: 10px 20px !important;
      border-radius: 30px;
      color: white;
      font-weight: 600;
      transition: all 0.3s ease !important;
      box-shadow: 0 5px 15px rgba(77, 161, 255, 0.2);
    }
    
    .cta-button:hover {
      background: linear-gradient(45deg, #4da1ff, #3d84ff);
      transform: translateY(-2px);
      box-shadow: 0 7px 20px rgba(77, 161, 255, 0.3);
    }
    
    .cta-button:after {
      display: none;
    }
    
    .dropdown-toggle {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    
    .dropdown-toggle:after {
      content: '';
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #ffffff;
      margin-left: 8px;
      transition: transform 0.3s ease;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: rgba(26, 43, 71, 0.95);
      backdrop-filter: blur(10px);
      padding: 15px;
      border-radius: 8px;
      min-width: 200px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      list-style: none;
      z-index: 100;
    }
    
    .dropdown-menu.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .dropdown-menu li {
      margin: 10px 0;
      margin-left: 0;
    }
    
    .dropdown-menu a {
      padding: 5px 10px;
      display: block;
      border-radius: 4px;
    }
    
    .dropdown-menu a:hover {
      background: rgba(77, 161, 255, 0.1);
    }
    
    .nav-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      cursor: pointer;
    }
    
    .nav-toggle span {
      display: block;
      height: 3px;
      width: 100%;
      background-color: white;
      border-radius: 3px;
      transition: all 0.3s ease;
    }
    
    @media (max-width: 992px) {
      .nav-toggle {
        display: flex;
      }
      
      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: #1a2b47;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        clip-path: circle(0px at 100% 0);
        transition: all 0.5s ease-out;
        pointer-events: none;
      }
      
      .nav-links.show {
        clip-path: circle(1000px at 90% -10%);
        pointer-events: all;
      }
      
      .nav-links li {
        margin: 15px 0;
      }
      
      .dropdown {
        position: relative;
      }
      
      .dropdown-menu {
        position: static;
        background: transparent;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        max-height: 0;
        overflow: hidden;
        padding: 0 15px;
        transition: max-height 0.3s ease;
      }
      
      .dropdown-menu.show {
        max-height: 1000px;
      }
    }
  `],
  animations: [fadeAnimation]
})
export class NavbarComponent {
  isScrolled = false;
  menuOpen = false;
  dropdownOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeMenu() {
    this.menuOpen = false;
    this.dropdownOpen = false;
  }
}