import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcher } from "../language-switcher/language-switcher";

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslateModule,
    LanguageSwitcher,
    RouterLinkActive
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private readonly translateService = inject(TranslateService);

  @Input({ required: true }) isUserLoggedIn!: string | boolean;
  @Input({ required: true }) isUserAdmin!: boolean;
  @Input({ required: true }) user!: any;

  @Output() logout = new EventEmitter();

  constructor(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
