import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReloadService } from '../services/reload.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css'],
})
export class ReloadComponent implements OnInit {
  constructor(
    private router: Router,
    private reloadService: ReloadService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.showLoader();
    setTimeout(() => {
      this.router.navigate(this.reloadService.getRoute());
      this.loader.hideLoader();
    }, 1000);
  }
}
