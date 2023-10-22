import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public redirectProfile() {
    this.router.navigate(['profile']);
  }
}
