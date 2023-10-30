import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderStatus = new BehaviorSubject<boolean>(false);

  getLoaderStatus() {
    return this.loaderStatus.asObservable();
  }

  showLoader() {
    this.loaderStatus.next(true);
  }

  hideLoader() {
    this.loaderStatus.next(false);
  }
}
