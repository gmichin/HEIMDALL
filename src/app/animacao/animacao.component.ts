import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animacao',
  templateUrl: './animacao.component.html',
  styleUrl: './animacao.component.scss',
})
export class AnimacaoComponent implements OnInit {
  showHeimdall = true;
  showLogo = false;
  showNome = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Exibe o heimdall.logo por 2 segundos e em seguida o remove
    setTimeout(() => {
      this.showHeimdall = false;
      this.showLogo = true;

      // Exibe o logo e a animação do nome
      setTimeout(() => {
        this.showNome = true;

        // Após 4 segundos, vai para a próxima página
        setTimeout(() => {
          this.router.navigate(['/inicial']);
        }, 4000);
      }, 2000);
    }, 2000);
  }
}
