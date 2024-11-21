import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasTurmasComponent } from './minhas-turmas.component';
import { HttpClientModule } from '@angular/common/http';
import { TurmaService } from 'src/app/services/turma.service';

describe('MinhasTurmasComponent', () => {
  let component: MinhasTurmasComponent;
  let fixture: ComponentFixture<MinhasTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MinhasTurmasComponent],
      providers: [TurmaService],
    }).compileComponents();

    fixture = TestBed.createComponent(MinhasTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
