import { Card, Suit } from "../cards/card";
import { EntityBase, EntityIdentifier } from "../interfaces/entitityidentifier";
import { Player, Hand } from '../player/player';
import { Deck } from '../cards/deck';
import { CardHistory, Game, GameStatus, PlayerCards, Turn } from "../interfaces/game";
import { GameBoard } from "./gameboard";
import { VisibleCards } from "./visiblecards";
import { ScoreTable } from '../scores/scoretable';

export class Tikki extends EntityBase implements Game {
    private ROUNDS = 1;
    private players: Player[];
    private gameBoard: GameBoard;
    private round: number;
    private started: boolean;
    private scores: ScoreTable;
    private currentTurnPlayer: Player;
    private askedSuit: Suit = null;
    private winner: Player;

    public constructor(id: EntityIdentifier) {
        super(id);
        this.players = [];
        this.scores = new ScoreTable();
    }

    isRunning(): boolean {
        return this.started;
    }

    addPlayer(...p: Player[]) {
        if (this.started) {
            throw new Error("Cannot add players when game is started");
        }
        p.forEach(player => {
            this.players.push(player)
        });
    }

    getPlayer(player: Player) {
        return this.players.find(p => p.isSameAs(player));
    }

    getPlayers(): Player[] {
        return this.players;
    }

    makeTurn(t: Turn): void {
        if (!this.started) {
            throw new Error("Game not started");
        };
        if (!t.player.isSameAs(this.currentTurnPlayer)) {
            throw new Error("Not your turn");
        };
        if (this.askedSuit === null) {
            // First round;
            this.playCard(t.player, t.card);
            this.askedSuit = t.card.suit;
            this.finishRoundFor(t.player);
            return;
        };
        const isValid = this.isValidMove(t);
        if (!isValid) {
            throw new Error("Not a valid move");
        };
        this.playCard(t.player, t.card);
        this.askedSuit = t.card.suit;
        this.finishRoundFor(t.player);
        if (this.round === this.ROUNDS+1) {
            this.started = false;
            this.winner = this.currentTurnPlayer;
            this.currentTurnPlayer = null;
            this.askedSuit = null;
            this.round--;
        };
    };

    private playCard(p: Player, c: Card) {
        const playerBoard = this.gameBoard.visibleCards.find(player => player.player.isSameAs(p));
        playerBoard.playedCards.set(this.round, c);
        const player = this.players.find(player => player.isSameAs(p));
        player.removeCard(c);
    }

    private finishRoundFor(player: Player) {
        // Move to next player
        const idx = this.players.indexOf(player);
        if (idx === this.playerCount()-1) {
            // Last of the round
            const roundResult = this.gameBoard.getHighestForRound(this.round, this.askedSuit);
            this.askedSuit = roundResult.suit;
            this.currentTurnPlayer = roundResult.player;
            this.round++;
            return;
        }
        this.currentTurnPlayer = this.players[idx+1];
    };

    private playerCount(): number {
        return this.players.length;
    }

    start(starter: Player = null): void {
        if (this.started) {
            throw new Error("Game already started");
        };
        
        if (starter) {
            this.currentTurnPlayer = starter;
        } else {
            this.currentTurnPlayer = this.players[0];
        }

        this.gameBoard = new GameBoard(new Deck());
        this.started = true;
        this.round = 1;
        this.players.forEach(p => {
            const vc = new VisibleCards(p);
            this.gameBoard.visibleCards.push(vc);
        });
      

        this.gameBoard.deck.shuffle();
        this.players.forEach(player => {
            player.addCard(this.gameBoard.deck.draw(5));
        });
    };



    createHistoryFor(p: Player): CardHistory[] {
        const hist = this.gameBoard.visibleCards.filter(v => v.player.isSameAs(p));
        if (hist.length == 1) {
            return hist[0].getCardHistory();
        }
        else {
            return null;
        };
    }

    createHistoryForPlayers(): PlayerCards[] {
        const pc: PlayerCards[] = [];
        this.players.forEach(player => {
            pc.push({p: player, history: this.createHistoryFor(player)})
        });
        return pc;
    }

    status(): GameStatus {
        const status: GameStatus = {
            started: this.started,
            round: this.round,
            turn: this.currentTurnPlayer,
            winner: this.winner,
            askedSuit: this.askedSuit,
            cardHistory: this.createHistoryForPlayers()
        }
        return status;
    }

    private isValidMove(t: Turn): boolean {
        // Does match asked?
        if (t.card.suit !== this.askedSuit) {
            return false;
        };
        const player = this.players.find(pl => pl.isSameAs(t.player));
        if (player.hasSuit(t.card.suit) && this.askedSuit !== t.card.suit) {
            return false;
        };
        return true;
    }

}




export class PlayerHand {
    player: Player;
    hand: Hand;
}
  

  