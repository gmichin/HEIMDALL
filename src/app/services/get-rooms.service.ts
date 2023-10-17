import { Injectable } from '@angular/core';
import { Rooms } from '../models/rooms.model';

@Injectable({
  providedIn: 'root',
})
export class GetRoomsService {
  public rooms: Rooms[] = [
    {
      name: 'Lab 1',
      seats: 30,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Eduardo Faria',
      schedule: '22:05 - 22:50',
    },
    {
      name: 'Sala 542',
      seats: 30,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Karen Lima',
      schedule: '21:05 - 22:05',
    },
    {
      name: 'Lab 13',
      seats: 43,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Eduardo Faria',
      schedule: '18:50 - 19:35',
    },
    {
      name: 'Sala 222',
      seats: 45,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Adriano Santos',
      schedule: '19:35 - 20:20',
    },
    {
      name: 'Lab 15',
      seats: 35,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Luis Oliveira',
      schedule: '20:20 - 21:05',
    },
    {
      name: 'Lab 2',
      seats: 30,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Luis Oliveira',
      schedule: '22:05 - 22:50',
    },
  ];

  public teachers = [
    { value: 'Eduardo Faria', name: 'Eduardo Faria' },
    { value: 'Karen Lima', name: 'Karen Lima' },
    { value: 'Adriano Santos', name: 'Adriano Santos' },
    { value: 'Luis Oliveira', name: 'Luis Oliveira' },
  ];

  public schedules = [
    { value: '18:50 - 19:35', name: '18:50 - 19:35' },
    { value: '19:35 - 20:20', name: '19:35 - 20:20' },
    { value: '20:20 - 21:05', name: '20:20 - 21:05' },
    { value: '21:05 - 22:05', name: '21:05 - 22:05' },
    { value: '22:05 - 22:50', name: '22:05 - 22:50' },
  ];

  constructor() {}
}
