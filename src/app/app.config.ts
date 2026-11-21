import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ApplicationConfig, importProvidersFrom, inject, PLATFORM_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from '@relynn/ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { headersInterceptor } from './core/interceptors/headers-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideClientHydration(),
    importProvidersFrom(NgxSpinnerModule),
   provideToastr({
  timeOut: 4000,
  progressBar: true,
  closeButton: true,
  newestOnTop: true,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
}),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, errorInterceptor,headersInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',   // مسار مطلق بدل ./assets/i18n/
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const platformId = inject(PLATFORM_ID);

      const lang = isPlatformBrowser(platformId)
        ? localStorage.getItem('lang') || 'en'
        : 'en';

      return firstValueFrom(translate.use(lang));
    })
  ],
};