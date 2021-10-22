import { Component, OnInit } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'partificer';

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
  }
}
