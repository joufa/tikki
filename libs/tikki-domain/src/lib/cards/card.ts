import { Equitable } from '../interfaces/entitityidentifier';
export enum Suit {
    SPADES = 0,
    CLUBS = 1,
    HEARTS = 2,
    DIAMONDS = 3
}

export class Card implements Equitable<Card>{
    readonly value: number;
    readonly suit: Suit;

    public constructor(value: number, suit: Suit) {
        this.value = value;
        this.suit = suit;
    }

    public toString(): string {
        return `Card: ${this.value} of ${Suit[this.suit]}`;
    }

    public isEqualTo(c: Card) {
        return this.suit as Suit === c.suit as Suit && this.value === c.value;
    }

    public isSameSuit(c: Card): boolean {
        return this.suit as Suit === c.suit as Suit;
    }
}