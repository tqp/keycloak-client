import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ReplaySubject } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profile: KeycloakProfile | undefined;
  private _loaded: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private keycloakService: KeycloakService) {
    keycloakService.loadUserProfile()
      .then(res => {
        console.debug('[ProfileService] user keycloakProfile fetched', res);
        this._profile = res;
        this._loaded.next(true);
      })
      .catch(err => {
        console.error('error fetching user keycloakProfile', err);
        this._loaded.next(false);
      });
  }

  get profile() {
    // return a copy so any changes to the object do not actually modify the configuration
    return Object.assign({}, this._profile);
  }

  get parsedToken() {
    return Object.assign({}, this.keycloakService.getKeycloakInstance()?.tokenParsed);
  }

  public getRoles(): string[] | null {
    if (this.parsedToken.realm_access) {
      return Object.assign([], this.parsedToken.realm_access.roles);
    }
    return null;
  }

  public hasRole(role: Role): boolean | undefined {
    const enabled = role ? this.parsedToken.realm_access?.roles?.includes(role) : false;
    console.debug('[ProfileService] checked role state', role, enabled);
    return enabled;
  }

  public hasAllRoles(roles: Role[]): boolean {
    return roles.length === 0 || roles.every(r => this.hasRole(r));
  }

  public hasAnyRole(roles: Role[]): boolean {
    return roles.length === 0 || roles.some(r => this.hasRole(r));
  }

  public hasRoles(roles: Role[], mode: 'ALL' | 'ANY' = 'ANY') {
    return mode === 'ALL' ? this.hasAllRoles(roles) : this.hasAnyRole(roles);
  }

  get loaded() {
    return this._loaded.asObservable();
  }
}
