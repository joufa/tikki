import { TikkiPlayer } from './player';
import { EntityIdentifier } from '../interfaces/entitityidentifier';
import { Card, Suit } from '../cards/card';
describe('player', () => {
    it('should extend entity', () => {
       const p = new TikkiPlayer(new EntityIdentifier(1), "Test");
       expect(p).toBeTruthy();
       const p2 = new TikkiPlayer(new EntityIdentifier(2), "Kimmo");
       expect(p2.isEqualTo(p)).toBeFalsy();
    });

    it('should tell if has suit', () => {
        const pata = new Card(10, Suit.SPADES);
        const p = new TikkiPlayer(new EntityIdentifier(1), "seppo");
        p.addCard([pata]);
        expect(p.hasSuit(Suit.SPADES)).toBeTruthy();
    });
});