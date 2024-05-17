import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { url_config } from '../url.config';
import { RegisterUserResponse, RequestRegistrationUserResponse } from '../models/register.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResgistrationRequestsService {

  constructor(
    private readonly _http: HttpClient,
    private readonly _sessionService: SessionService,
  ) { }

  public findRequestsByInst(): Observable<RegisterUserResponse[]> {
    const idInst = this._sessionService.getSessionData<string>('idInstitution').retorno;
    return this._http.get<RegisterUserResponse[]>(`${url_config.url_registration}/${idInst}`)
  }

  public sendResquestResponse(reqs: RequestRegistrationUserResponse[]): Observable<RequestRegistrationUserResponse[]> {
    return this._http.post<RequestRegistrationUserResponse[]>(`${url_config.url_registration}/validate`, reqs);
  }

}
