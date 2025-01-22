import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { userReducer } from '@store/reducers/users.reducer';
import { UsersEffects } from '@store/effects/users.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore(),
    provideState({ name: 'users', reducer: userReducer }),
    provideEffects(UsersEffects),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
    }),
  ],
};
