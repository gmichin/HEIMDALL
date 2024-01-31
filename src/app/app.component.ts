import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  loader: boolean = false;
  private subs: Subscription = new Subscription();

  constructor(private loaderService: LoaderService, private router: Router) {}
  ngOnInit(): void {
    // this.subs = this.loader$();
  }

  // public loader$() {
  //   const tela = this.router.url;
  //   return this.router.events.subscribe((event: any) => {
  //     if (event instanceof NavigationStart) {
  //       this.loaderService.showLoader();
  //       this.loader = true;
  //       return;
  //     }
  //     this.loaderService.hideLoader();
  //     this.loader = false;
  //   });
  // }
}
