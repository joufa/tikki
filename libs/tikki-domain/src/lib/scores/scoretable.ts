import { Player } from '../player/player';
import { Helpers } from '../../../helpers';

export interface Scores {
    results: PlayerScore[];
}

export interface PlayerScore {
    p: Player;
    scores: number;
}

export interface ScoreRepository {
    save(): void;
    load(): ScoreTable;
}
export class ScoreTable {
    private scores: Map<Player, number>;

    public constructor() {
        this.scores = new Map();
    }

    addPoint(p: Player) {
        const existingScore = this.scores.get(p);
        if (Helpers.isUndefined(existingScore)) {
            this.scores.set(p, 1);
        } else {
            this.scores.set(p, existingScore + 1);
        }
    }

    getScores(): Scores {
        const score: PlayerScore[] = [];
        this.scores.forEach((s: number, key: Player) => {
            score.push({p: key, scores: s})
        })
        return {results: score} as Scores;
    }
    
    static createFromExisting(s: Scores): ScoreTable {
        const scores: Map<Player, number> = new Map();
        s.results.forEach(result => {
            scores.set(result.p, result.scores);
        });
        const st = new ScoreTable();
        st.scores = scores;
        return st;
   }
}