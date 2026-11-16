import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { TranslateLoader } from '@ngx-translate/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateServerLoaderService } from './core/services/translate-server.loader.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: TranslateLoader, useClass: TranslateServerLoaderService },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);