import { Card, Suit } from "../cards/card";
import { EntityBase, EntityIdentifier, Equitable } from '../interfaces/entitityidentifier';
import { Helpers } from '../../../helpers';

export interface Player {
    getName(): string;
    addCard(c: Card[]): void;
    removeCard(c: Card): void;
    getHand(): Hand;
    isSameAs(p: Player): boolean;
    hasSuit(s: Suit): boolean;
}
export class TikkiPlayer extends EntityBase implements Player, Equitable<TikkiPlayer> {
    private name: string;
    private hand: Hand;
    
    constructor(id: EntityIdentifier, name: string) {
        super(id);
        this.name = name;
        this.hand = new Hand();
    }
    hasSuit(s: Suit): boolean {
        return this.hand.hasSuit(s);
    }
    removeCard(c: Card): void {
        this.hand.remove(c);
    }
    isSameAs(p: Player): boolean {
        return (p as TikkiPlayer).isEqualTo(this);
    }
    isEqualTo(other: TikkiPlayer): boolean {
        if (Helpers.isUndefined(other)) {
            return false;
        }
        if (this.id.isEqualTo(other.id)) {
            return true;
        }
        return false;
    }

    toString(): string {
        let text = `Player ${this.name}, ${this.id.print()}\n Hand: `;
        this.hand.cards.forEach((c: Card) => {
            text += c.toString();
            text += " ";
        });
        return text;
    }

    getName(): string {
        return this.name;
    }

    getHand(): Hand {
        return this.hand;
    }

    addCard(c: Card[]) {
        c.forEach(card => {
            this.hand.cards.push(card);
        });
    }
    showCards() {
        console.log("Cards in hand:\n");
        this.hand.cards.forEach(card => {
            console.log(card.toString()+"\n");
        });
    }
}

export class Hand {
    public cards: Card[];
    constructor() {
        this.cards = [];
    }
    public remove(c: Card) {
        this.cards = this.cards.filter(card => card !== c);
    }
    public hasSuit(s: Suit): boolean {
        let hasSuit: boolean;
        this.cards.forEach(c => {
            if (c.suit as Suit === s as Suit) {
                hasSuit = true;
            };
        });
        return hasSuit;
    }
}
