import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { TurmaModel } from '../models/turma.model';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public getAllTurmas(): Observable<TurmaModel[]> {
    const url = `${url_config.url_turma}`;
    return this.http.get<TurmaModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public criarTurma(turmas: TurmaModel) {
    return this.http.post(url_config.url_turma, turmas);
  }

  public atualizarTurmas(turma: TurmaModel) {
    const turmaAtualizada = {
      professor: turma.professor_id,
      disciplina: turma.disciplina_id,
      periodo: turma.periodo,
    };
    return this.http.patch(
      `${url_config.url_turma}/${turma.turma_id}`,
      turmaAtualizada
    );
  }

  public deletarTurma(turma: TurmaModel[]) {
    const arrReqs: Observable<any>[] = [];
    turma.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_turma}/${r.turma_id}`));
    });

    return forkJoin(...arrReqs);
  }

  public getTurmaPorProfessor(professorId: string): Observable<TurmaModel[]> {
    return this.http.get<TurmaModel[]>(
      `${url_config.url_turma}?professor_id=${professorId}`
    );
  }
  public getTurmaPorDisciplina(disciplinaId: string): Observable<TurmaModel[]> {
    return this.http.get<TurmaModel[]>(
      `${url_config.url_turma}?disciplina_id=${disciplinaId}`
    );
  }
  public getTurmaPorPeriodo(periodo: string): Observable<TurmaModel[]> {
    return this.http.get<TurmaModel[]>(
      `${url_config.url_turma}?periodo=${periodo}`
    );
  }

  public salvarTurmaToEdit(turma: TurmaModel) {
    this.sessionService.setItem('editTurmas', turma);
    this.router.navigate(['tela-novas-turmas']);
  }

  public getTurmaToEdit(): { turma: TurmaModel; valid: boolean } {
    const turmas = this.sessionService.getSessionData<TurmaModel>('editTurmas');
    if (turmas.valido) {
      sessionStorage.removeItem('editTurmas');
      return { valid: true, turma: turmas.retorno };
    }
    return { valid: false, turma: {} as TurmaModel };
  }

  public criarAlunosTurma(turmas: any) {
    // Extraindo apenas os aluno_ids em um array de números
    const alunoIds = turmas.aluno_ids.map((aluno: any) => aluno.aluno_id);

    console.log(alunoIds); // Verifique se está saindo como [5, 6]

    // A estrutura do body agora está correta
    return this.http.post(
      `${url_config.url_turma}/${turmas.turma_id}/alunos/adicionar`,
      { alunoIds } // Enviando o array de IDs diretamente
    );
  }

  public deletarAlunosTurma(turmas: any) {
    // Extraindo os IDs dos alunos para um array
    const alunoIds = turmas.alunos.map((aluno: any) => aluno.aluno_id);

    return this.http.delete(
      `${url_config.url_turma}/${turmas.turma_id}/alunos/remover`,
      {
        body: { alunoIds }, // Enviando o array de IDs dos alunos
      }
    );
  }
}
