export interface IReserva {
  reserva_id?: number;
  professor_id: number;
  sala_id: number;
  status: boolean;
  turma_id: number;
  dataInicio: string; // Formato "YYYY-MM-DD"
  dataFim: string; // Formato "YYYY-MM-DD"
  horaInicio: string; // Formato "HH:mm"
  horaFim: string; // Formato "HH:mm"
}

export interface IConsultaReserva {
  reserva_id: number;
  status: boolean;
  hora_inicio: string;
  hora_final: string;
  dias_reservados: string[];
  sala: {
    sala_id: number;
    status: boolean;
    ident_sala: string;
    num_cadeiras: number;
    num_mesas: number;
    num_projetores: number;
    num_computadores: number;
    num_lousas: number;
  };
}
