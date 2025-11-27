import { Component } from '@angular/core';
import { JuegoComponent } from './juego/juego.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JuegoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }
