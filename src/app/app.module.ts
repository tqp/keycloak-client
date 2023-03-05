import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ContainerComponent } from './container/container.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    return keycloak.init({
      config: {
        url: 'https://keycloak.timsanalytics.com/',
        realm: 'tims-analytics',
        clientId: 'webapp-local'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
      bearerExcludedUrls: [ '/assets' ]
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ContainerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [ KeycloakService ]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
