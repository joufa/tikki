import { Tikki } from './game/game';
import { EntityIdentifier } from './interfaces/entitityidentifier';
import { ScoreTable } from './scores/scoretable';

export class TikkiService {
    private static instance: TikkiService;
    private games: Tikki[];
    private scores: ScoreTable;
    private constructor() { // Private constructor 
        this.games = [];
    }

    public static getInstance(): TikkiService {
        if (!TikkiService.instance) {
            this.init();
        
        }
        return TikkiService.instance;
    }

    private static init() {
        this.instance = new TikkiService();
    }

    public addGame(g: Tikki): void {
        this.games.push(g);
    }

    public getGame(e: EntityIdentifier) {
        return this.games.find(g => g.id.isEqualTo(e));
    }
}