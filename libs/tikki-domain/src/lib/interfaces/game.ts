import { Card, Suit } from "../cards/card";
import { Player } from "../player/player";

export interface Turn {
    card: Card;
    player: Player;
}

export interface Game {
    addPlayer(...p: Player[]): void;
    getPlayers(): Player[];
    isRunning(): boolean;
    start(): void;
    status(): GameStatus;
    makeTurn(t: Turn): void;
}
export interface GameStatus {
    started: boolean;
    round: number;
    turn: Player;
    askedSuit: Suit;
    winner: Player;
    cardHistory: PlayerCards[];
}

export interface PlayerCards {
    p: Player;
    history: CardHistory[];
}
export interface CardHistory {
    round: number;
    card: Card;
}