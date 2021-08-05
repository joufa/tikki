import { Card, Suit } from "../cards/card";
import { Deck } from "../cards/deck";
import { Player } from "../player/player";
import { VisibleCards } from "./visiblecards";


export interface HighestForRoundResult {
    player: Player;
    suit: Suit;
}

// Gameboard is alive for one game (n rounds)
export class GameBoard {
    visibleCards: VisibleCards[];
    deck: Deck;

    public constructor(deck: Deck) {
        this.visibleCards = [];
        this.deck = deck;
    }

    getHighestForRound(r: number, s: Suit): HighestForRoundResult {
        // Get all cards 
        let highest: Card = null;
        let p: Player;
        this.visibleCards.forEach(cards => {
            const pcard = cards.playedCards.get(r);
            if (highest == null) {
                highest = pcard;
                p = cards.player;
            }
            if (pcard.value > highest.value && pcard.suit as Suit === s as Suit) {
                    highest = pcard;
                    p = cards.player;
            };
        });

        return {
            player: p,
            suit: highest.suit
        };
    }
}