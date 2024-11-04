export interface IReserva {
  reserva_id?: number;
  professor_id: number;
  sala_id: number;
  turma_id: number;
  dataInicio: string; // Formato "YYYY-MM-DD"
  dataFim: string;    // Formato "YYYY-MM-DD"
  horaInicio: string; // Formato "HH:mm"
  horaFim: string;    // Formato "HH:mm"
}
