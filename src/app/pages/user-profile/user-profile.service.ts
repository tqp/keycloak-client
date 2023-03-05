import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) {
  }

  public getOpenEndpointResponse(): Observable<any> {
    const url = environment.apiUrl + '/api/v1/diagnostics/open';
    // const url = '/api/v1/diagnostics/open';
    return this.http.get<any>(url);
  }

  public getUserEndpointResponse(): Observable<any> {
    const url = environment.apiUrl + '/api/v1/diagnostics/user';
    // const url = '/api/v1/diagnostics/user';
    return this.http.get<any>(url);
  }

  public getManagerEndpointResponse(): Observable<any> {
    const url = environment.apiUrl + '/api/v1/diagnostics/manager';
    // const url = '/api/v1/diagnostics/manager';
    return this.http.get<any>(url);
  }

  public getAdminEndpointResponse(): Observable<any> {
    const url = environment.apiUrl + '/api/v1/diagnostics/admin';
    // const url = '/api/v1/diagnostics/admin';
    return this.http.get<any>(url);
  }
}
