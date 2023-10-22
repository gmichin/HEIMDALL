import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '../models/register.models';
import { url_config } from './../url.config';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  constructor(private http: HttpClient) {}

  register(request: RegisterUserRequest): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(url_config.url_user, request);
  }
}
