import { Service, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export type Lang = 'en' | 'ar';

@Service()
export class MytranslateService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly lang = signal<Lang>('en');

  init() {
    return firstValueFrom(this.setLang(this.getSavedLang()));
  }

  toggle(): void {
    this.setLang(this.lang() === 'en' ? 'ar' : 'en').subscribe();
  }

  setLang(lang: Lang) {
    this.lang.set(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang); // الحفظ بيحصل هنا
    }
    this.changeDirection(lang);
    return this.translate.use(lang);
  }

  private getSavedLang(): Lang {
    if (!this.isBrowser) return 'en';
    return localStorage.getItem('lang') === 'ar' ? 'ar' : 'en';
  }

  private changeDirection(lang: Lang): void {
    const html = this.document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }
}