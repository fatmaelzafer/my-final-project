import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptor/header/header-interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptor/error/error-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptor/loader/loader-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,loaderInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    importProvidersFrom(NgxSpinnerModule),
     provideToastr(),
  ]
};
