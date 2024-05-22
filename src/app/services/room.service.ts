import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomsModel } from '../models/rooms.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }

  public createRoom(room: RoomsModel) {
    if ('_id' in room) {
      delete room._id;
    }
    return this.http.post(url_config.url_room, room);
  }

  public getRoomsByInst(): Observable<RoomsModel[]> {
    const idInstitution = this.sessionService.getSessionData<string>(
      'idInstitution'
    ).retorno;

    return this.http.get<RoomsModel[]>(`${url_config.url_room}/by-inst/${idInstitution}`);
  }

}
