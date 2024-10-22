export class ValidacaoModel {
  valida_id?: number;
  professor_id!: number;
  sala_id!: number;
  reserva_id!: number;
  status!: boolean;
  data_hora_inicio!: Date;
  data_hora_final!: Date;

  constructor(data: Omit<ValidacaoModel, 'valida_id'>) {
    this.professor_id = data.professor_id;
    this.sala_id = data.sala_id;
    this.reserva_id = data.reserva_id;
    this.status = data.status;
    this.data_hora_inicio = data.data_hora_inicio;
    this.data_hora_final = data.data_hora_final;
  }
}
