import { SalaModel } from '../models/sala.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public createRoom(room: SalaModel) {
    if ('_id' in room) {
      delete room._id;
    }
    return this.http.post(url_config.url_sala, room);
  }

  public updateRoom(room: SalaModel) {
    return this.http.patch(`${url_config.url_sala}/${room.sala_id}`, room);
  }

  public deleteRoom(room: SalaModel[]) {
    const arrReqs: Observable<any>[] = [];
    room.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_sala}/${r.sala_id}`));
    });

    return forkJoin(...arrReqs);
  }

  public getRoomsByInst(): Observable<SalaModel[]> {
    const idInstitution =
      this.sessionService.getSessionData<string>('idInstitution').retorno;

    return this.http
      .get<SalaModel[]>(`${url_config.url_sala}/by-inst/${idInstitution}`)
      .pipe(map((r) => r.filter((r) => r.status == true)));
  }

  public saveRoomToEdit(room: SalaModel) {
    this.sessionService.setItem('editRoom', room);
    this.router.navigate(['tela-novas-salas']);
  }

  public getRoomToEdit(): { room: SalaModel; valid: boolean } {
    const room = this.sessionService.getSessionData<SalaModel>('editRoom');
    if (room.valido) {
      sessionStorage.removeItem('editRoom');
      return { valid: true, room: room.retorno };
    }
    return { valid: false, room: {} as SalaModel };
  }
}
