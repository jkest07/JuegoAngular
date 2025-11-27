import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carta {
    imagen: string;
    valor: number;
    estado: boolean; // true = cara visible, false = oculta (espalda)
    emparejada: boolean;
  }

  @Component({
    selector: 'app-juego',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './juego.html',
    styleUrls: ['./juego.css'],
  })
  export class JuegoComponent {
    cartasJuego: Carta[] = [
      { imagen: '☠️', valor: 1, estado: false, emparejada: false },
      { imagen: '☠️', valor: 1, estado: false, emparejada: false },
      { imagen: '🔴', valor: 2, estado: false, emparejada: false },
      { imagen: '🔴', valor: 2, estado: false, emparejada: false },
      { imagen: '👽', valor: 3, estado: false, emparejada: false },
      { imagen: '👽', valor: 3, estado: false, emparejada: false },
      { imagen: '🐷', valor: 4, estado: false, emparejada: false },
      { imagen: '🐷', valor: 4, estado: false, emparejada: false },
      { imagen: '😶‍🌫️', valor: 5, estado: false, emparejada: false },
      { imagen: '😶‍🌫️', valor: 5, estado: false, emparejada: false },
      { imagen: '🤬', valor: 6, estado: false, emparejada: false },
      { imagen: '🤬', valor: 6, estado: false, emparejada: false },
      { imagen: '💩', valor: 7, estado: false, emparejada: false },
      { imagen: '💩', valor: 7, estado: false, emparejada: false },
      { imagen: '👻', valor: 8, estado: false, emparejada: false },
      { imagen: '👻', valor: 8, estado: false, emparejada: false },
    ];

  
    primeros: Carta | null = null;
    segundos: Carta | null = null;
    bloqueado = false;
    intentos = 0;
    paresEncontrados = 0;
    juegoTerminado = false;

    constructor() {
      this.barajar();
    }

    barajar() {
      for (let i = this.cartasJuego.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cartasJuego[i], this.cartasJuego[j]] = [this.cartasJuego[j], this.cartasJuego[i]];
      }
    }

    reset() {
      this.cartasJuego.forEach(c => { c.estado = false; c.emparejada = false; });
      this.primeros = null;
      this.segundos = null;
      this.bloqueado = false;
      this.intentos = 0;
      this.paresEncontrados = 0;
      this.juegoTerminado = false;
      this.barajar();
    }

    clickCarta(carta: Carta) {
      if (this.bloqueado) return;
      if (carta.emparejada) return; // carta ya emparejada
      if (carta.estado) return; // ya está volteada

      carta.estado = true; // mostrar carta

      if (!this.primeros) {
        this.primeros = carta;
        return;
      }

      if (this.primeros && !this.segundos) {
        this.segundos = carta;
        // Incrementar intentos: cada vez que se voltean 2 cartas es un intento
        this.intentos++;
        this.bloqueado = true;

        // comparar
        if (this.primeros.valor === this.segundos.valor) {
          // pareja encontrada
          this.primeros.emparejada = true;
          this.segundos.emparejada = true;
          this.paresEncontrados++;
          this.limpiarSelecciones();

          // verificar fin de juego
          if (this.paresEncontrados === this.cartasJuego.length / 2) {
            this.juegoTerminado = true;
          }
        } else {
          // no coinciden: voltear de nuevo después de un breve delay
          setTimeout(() => {
            if (this.primeros) this.primeros.estado = false;
            if (this.segundos) this.segundos.estado = false;
            this.limpiarSelecciones();
          }, 800);
        }
      }
    }

    limpiarSelecciones() {
      this.primeros = null;
      this.segundos = null;
      this.bloqueado = false;
    }
}
