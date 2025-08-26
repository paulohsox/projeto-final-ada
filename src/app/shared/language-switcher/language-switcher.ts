import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-language-switcher',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private readonly translateService = inject(TranslateService);

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
