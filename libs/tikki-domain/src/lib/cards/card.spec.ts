import { Suit, Card } from './card';
import { Deck } from "./deck";

describe('cards and deck', () => {
    it('should initalize', () => {
        const deck = new Deck();
        expect(deck.size()).toBe(52);
    });

    it('should be equitaible', () => {
        const deck = new Deck();
        const card = deck.draw(2);
        expect(card[0].isEqualTo(card[1])).toBeFalsy();
        expect(deck.size()).toBe(50);
    });

    it('should be suit comparable', () => {
        const diamondAce = new Card(14, Suit.DIAMONDS);
        const diamondTen = new Card(10, Suit.DIAMONDS);
        const spade = new Card(12, Suit.SPADES);
        console.log(spade.toString());
        expect(diamondAce.isSameSuit(diamondTen)).toBeTruthy();
        expect(diamondTen.isSameSuit(spade)).toBeFalsy();
    });
});