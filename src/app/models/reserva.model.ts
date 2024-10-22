export class ReservaModel {
  reserva_id?: number;
  professor_id!: number;
  sala_id!: number;
  status!: boolean;
  data_hora_inicio!: Date;
  data_hora_final!: Date;

  constructor(data: Omit<ReservaModel, 'reserva_id'>) {
    this.professor_id = data.professor_id;
    this.sala_id = data.sala_id;
    this.status = data.status;
    this.data_hora_inicio = data.data_hora_inicio;
    this.data_hora_final = data.data_hora_final;
  }
}
