import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  emoji: string;
  revealed: boolean;
  matched: boolean;
  questionId: number;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
}

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {

  // -----------------------------
  // QUESTIONS (fixed in English)
  // -----------------------------
  questions: Question[] = [
    {
      id: 1,
      text: "Who is known as the inventor of the first mobile phone?",
      options: ["A. Steve Jobs", "B. Martin Cooper", "C. Alexander Graham Bell", "D. Nikola Tesla"],
      correct: "B"
    },
    {
      id: 2,
      text: "In what year was the first mobile phone call made?",
      options: ["A. 1965", "B. 1973", "C. 1985", "D. 1990"],
      correct: "B"
    },
    {
      id: 3,
      text: "What company created the first commercial mobile phone (the DynaTAC 8000X)?",
      options: ["A. Apple", "B. Nokia", "C. Motorola", "D. Samsung"],
      correct: "C"
    },
    {
      id: 4,
      text: "What was a major limitation of the first mobile phones?",
      options: ["A. Touch screens", "B. Too light", "C. Very short battery life", "D. Internet access"],
      correct: "C"
    },
    {
      id: 5,
      text: "How much did the first commercial mobile phone approximately weigh?",
      options: ["A. 100g", "B. 500g", "C. 1kg", "D. 2kg"],
      correct: "C"
    },
    {
      id: 6,
      text: "What was the main purpose of the first mobile phone?",
      options: ["A. Games", "B. Photos", "C. Voice calls", "D. Internet"],
      correct: "C"
    },
    {
      id: 7,
      text: "What improvement allowed mobile phones to become smaller?",
      options: ["A. Better cameras", "B. Advanced batteries/circuits", "C. Larger antennas", "D. Gaming software"],
      correct: "B"
    },
    {
      id: 8,
      text: "Which network was used by the earliest mobile phones?",
      options: ["A. 1G", "B. 3G", "C. 4G", "D. 5G"],
      correct: "A"
    },
    {
      id: 9,
      text: "How did early phones differ from modern smartphones?",
      options: ["A. Color screens", "B. Physical antennas", "C. Apps & WiFi", "D. Face recognition"],
      correct: "B"
    },
    {
      id: 10,
      text: "Why was the invention of the mobile phone important?",
      options: ["A. Television quality", "B. Replaced PCs", "C. Instant global communication", "D. Made radio obsolete"],
      correct: "C"
    }
  ];

  // --------------------------------
  // CARD DATA (20 cards, 10 pairs)
  // --------------------------------
  emojis = ["📱","📞","📡","🔋","📶","💾","🛰️","🕹️","⚡","📟"];

  cards: Card[] = [];
  selectedCards: Card[] = [];
  blocked = false;
  score = 0;

  // Current Question UI
  currentQuestion: Question | null = null;
  waitingQuestionFor: number | null = null;

  constructor() {
    this.generateCards();
  }

  // -----------------------------
  // Create the 20 cards
  // -----------------------------
  generateCards() {
    let id = 1;
    for (let i = 0; i < 10; i++) {
      const cardA: Card = { id: id++, emoji: this.emojis[i], revealed: false, matched: false, questionId: i + 1 };
      const cardB: Card = { id: id++, emoji: this.emojis[i], revealed: false, matched: false, questionId: i + 1 };

      this.cards.push(cardA, cardB);
    }

    // Shuffle
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  // -----------------------------
  // Card click logic
  // -----------------------------
  selectCard(card: Card) {
    if (card.revealed || card.matched || this.blocked) return;

    card.revealed = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.blocked = true;

      const [c1, c2] = this.selectedCards;

      if (c1.emoji === c2.emoji) {
        // MATCH FOUND
        c1.matched = true;
        c2.matched = true;

        // Show question
        this.currentQuestion = this.questions.find(q => q.id === c1.questionId) || null;
        this.waitingQuestionFor = c1.questionId;

        this.selectedCards = [];
        this.blocked = false;

      } else {
        // No match → flip back
        setTimeout(() => {
          c1.revealed = false;
          c2.revealed = false;
          this.selectedCards = [];
          this.blocked = false;
        }, 700);
      }
    }
  }

  // -----------------------------
  // Answer question
  // -----------------------------
  answer(letter: string) {
    if (!this.currentQuestion) return;

    if (letter === this.currentQuestion.correct) {
      this.score++;
      alert("Respuesta correcta ✔ Punto sumado");
    } else {
      alert("Respuesta incorrecta ✘ No se suma punto");
    }

    this.currentQuestion = null;
    this.waitingQuestionFor = null;
  }

  // -----------------------------
  // Reset Game
  // -----------------------------
  reset() {
    this.cards = [];
    this.selectedCards = [];
    this.blocked = false;
    this.score = 0;
    this.currentQuestion = null;

    this.generateCards();
  }
}
