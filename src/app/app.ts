import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JuegoComponent } from './juego/juego';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JuegoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JuegoAngular');
}
