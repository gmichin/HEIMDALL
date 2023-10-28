import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RoleModelResponse } from '../models/role.model';
import { url_config } from '../url.config';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  public validateRole(role_id: string): Observable<string> {
    const url = `${url_config.url_roles}/${role_id}`;
    return this.http
      .get<RoleModelResponse>(url)
      .pipe(map((res) => res.role_name));
  }
}
