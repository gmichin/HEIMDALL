import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { RoleModelResponse } from '../models/role.model';
import { url_config } from '../url.config';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  public validateRole(role_id: string): Observable<string> {
    const url = `${url_config.url_roles}/${role_id}`;
    return this.http.get<RoleModelResponse>(url).pipe(
      map(() => {
        throw '';
      }),
      catchError(() => {
        const validate: any = {
          '0': { role_name: 'Administrador Geral' },
          '1': { role_name: 'Administrador de Curso' },
          '2': { role_name: 'Professor' },
        };
        return of(validate[role_id]);
      }),
      map((res) => res.role_name)
    );
  }
}
