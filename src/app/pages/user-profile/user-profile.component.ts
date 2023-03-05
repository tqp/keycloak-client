import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { ProfileService } from '../../services/profile.service';
import { UserProfileService } from './user-profile.service';
import { KeyValue } from '../../models/key-value';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public roleListFiltered: string[] | undefined;
  public openEndpointResponse: KeyValue<string, string> | null = null;
  public userEndpointResponse: KeyValue<string, string> | null = null;
  public managerEndpointResponse: KeyValue<string, string> | null = null;
  public adminEndpointResponse: KeyValue<string, string> | null = null;

  private roleBlackList = [
    'offline_access',
    'uma_authorization',
    'default-roles-tims-analytics'
  ];

  constructor(private keycloak: KeycloakService,
              public profileService: ProfileService,
              public userProfileService: UserProfileService) {
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    let roleList = this.profileService.getRoles();
    if (roleList != null) {
      this.roleListFiltered = roleList.sort();
      this.roleListFiltered = this.roleListFiltered.filter(x => !this.roleBlackList.includes(x));
    }

    this.getOpenEndpointResponse();
    this.getUserEndpointResponse();
    this.getManagerEndpointResponse();
    this.getAdminEndpointResponse();
  }

  private getOpenEndpointResponse(): void {
    this.userProfileService.getOpenEndpointResponse().subscribe({
      next: (keyValue: KeyValue<string, string>) => {
        this.openEndpointResponse = keyValue;
      },
      error: () => {
        this.openEndpointResponse = { key: 'open-endpoint', value: 'failure' };
      }
    });
  }

  private getUserEndpointResponse(): void {
    this.userProfileService.getUserEndpointResponse().subscribe({
      next: (keyValue: KeyValue<string, string>) => {
        this.userEndpointResponse = keyValue;
      },
      error: () => {
        this.userEndpointResponse = { key: 'user-endpoint', value: 'failure' };
      }
    });
  }

  private getManagerEndpointResponse(): void {
    this.userProfileService.getManagerEndpointResponse().subscribe({
      next: (keyValue: KeyValue<string, string>) => {
        this.managerEndpointResponse = keyValue;
      },
      error: () => {
        this.managerEndpointResponse = { key: 'manager-endpoint', value: 'failure' };
      }
    });
  }

  private getAdminEndpointResponse(): void {
    this.userProfileService.getAdminEndpointResponse().subscribe({
      next: (keyValue: KeyValue<string, string>) => {
        this.adminEndpointResponse = keyValue;
      },
      error: () => {
        this.adminEndpointResponse = { key: 'admin-endpoint', value: 'failure' };
      }
    });
  }

  public logout() {
    this.keycloak.logout(document.location.origin).then();
  }

}
