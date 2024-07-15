import { Component } from '@angular/core';
import {BehaviorSubject, finalize} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading  = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  onButtonClick() {
    this.loadingSubject.next(true);
    this.http.get('https://api.example.com/data').pipe(finalize(() => this.loadingSubject.next(false))).subscribe({
      next: data => console.log(data),
      error: error => console.error(error)
      }
    );
  }
}
