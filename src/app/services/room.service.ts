import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomsModel } from '../models/rooms.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  public createRoom(room: RoomsModel) {
    if ('_id' in room) {
      delete room._id;
    }
    return this.http.post(url_config.url_room, room);
  }

  public updateRoom(room: RoomsModel) {
    return this.http.patch(`${url_config.url_room}/${room._id}`, room);
  }
 
  public deleteRoom(room: RoomsModel[]) {
    const arrReqs: Observable<any>[] = [];
    room.forEach(r => {
      arrReqs.push(this.http.delete(`${url_config.url_room}/${r._id}`));
    });

    return forkJoin(...arrReqs);
  }

  public getRoomsByInst(): Observable<RoomsModel[]> {
    const idInstitution = this.sessionService.getSessionData<string>(
      'idInstitution'
    ).retorno;

    return this.http.get<RoomsModel[]>(`${url_config.url_room}/by-inst/${idInstitution}`).pipe(
      map(r => r.filter(r => r.status == 'DISPONIVEL'))
    );
  }

  public saveRoomToEdit(room: RoomsModel){
    this.sessionService.setItem('editRoom', room);
    this.router.navigate(['tela-novas-salas']);
  }

  public getRoomToEdit(): {room:RoomsModel, valid: boolean} {
    const room = this.sessionService.getSessionData<RoomsModel>('editRoom');
    if(room.valido) {
      sessionStorage.removeItem('editRoom');
      return {valid: true, room: room.retorno};
    }
    return {valid: false, room: {} as RoomsModel};
  }

}
