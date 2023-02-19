import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: [ './container.component.scss' ]
})
export class ContainerComponent implements OnInit {

  constructor(private keycloak: KeycloakService) {
  }

  ngOnInit(): void {
    console.log('ContainerComponent');
  }

  public logout(): void {
    this.keycloak.logout(document.location.origin).then();
  }

}
