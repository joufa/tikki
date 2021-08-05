import { Card } from "../cards/card";
import { CardHistory } from "../interfaces/game";
import { Player } from "../player/player";

export class VisibleCards {
    readonly player: Player;
    readonly playedCards: Map<number, Card>;
    
    constructor(p: Player) {
        this.player = p;
        this.playedCards = new Map();
    }

    getCardHistory(): CardHistory[] {
        const ch: CardHistory[] = [];
        this.playedCards.forEach((value: Card, key: number) => {
            ch.push({round: key, card: value});
        });
        return ch;
    }
}