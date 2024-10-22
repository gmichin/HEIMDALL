export class SalaModel {
  sala_id?: number;
  status!: boolean;
  ident_sala!: string;
  num_cadeiras!: number;
  num_mesas!: number;
  num_projetores!: number;
  num_computadores!: number;
  num_lousas!: number;

  constructor(data: Omit<SalaModel, 'sala_id'>) {
    this.status = data.status;
    this.ident_sala = data.ident_sala;
    this.num_cadeiras = data.num_cadeiras;
    this.num_mesas = data.num_mesas;
    this.num_projetores = data.num_projetores;
    this.num_computadores = data.num_computadores;
    this.num_lousas = data.num_lousas;
  }
}
