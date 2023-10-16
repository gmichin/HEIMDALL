import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetRoomsService {
  public rooms = [
    {
      name: 'Lab 1',
      seats: 30,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Eduardo Faria',
    },
    {
      name: 'Sala 542',
      seats: 30,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Karen Lima',
    },
    {
      name: 'Lab 13',
      seats: 43,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Eduardo Faria',
    },
    {
      name: 'Sala 222',
      seats: 45,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Adriano Santos',
    },
    {
      name: 'Lab 15',
      seats: 35,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Luis Oliveira',
    },
    {
      name: 'Lab 2',
      seats: 30,
      description: 'Esta é a Sala 8, com uma descrição detalhada.',
      teacher: 'Luis Oliveira',
    },
  ];

  teachers = [
    { value: 'Eduardo Faria', name: 'Eduardo Faria' },
    { value: 'Karen Lima', name: 'Karen Lima' },
    { value: 'Adriano Santos', name: 'Adriano Santos' },
    { value: 'Luis Oliveira', name: 'Luis Oliveira' },
  ];

  constructor() {}
}
