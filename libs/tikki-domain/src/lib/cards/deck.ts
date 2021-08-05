import { Card, Suit } from './card';

export class Deck {
  cards: Card[];

  public constructor() {
    this.init();
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
    }
  }

  draw(amount: number): Card[] {
    const draw: Card[] = [];
    for (let i = 0; i < amount; i++) {
        draw.push(this.cards.pop());
    }
    return draw;
  }

  size() {
    return this.cards.length;
  }

  private init(): void {
    this.cards = [];
    for (const suit in Suit) {
      if (isNaN(Number(suit))) {
        for (let i = 2; i < 15; i++) {
          this.cards.push(new Card(i, (suit as unknown) as Suit));
        }
      }
    }
  }
}
