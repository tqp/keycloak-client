import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: [ './container.component.scss' ]
})
export class ContainerComponent {
  public env: string = 'Unknown';

  constructor(private keycloak: KeycloakService) {
    this.env = environment.env;
  }

  public logout(): void {
    this.keycloak.logout(document.location.origin).then();
  }

}
