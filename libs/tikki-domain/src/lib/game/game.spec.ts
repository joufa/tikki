import { EntityIdentifier } from '../interfaces/entitityidentifier';
import { TikkiPlayer } from '../player/player';
import { Tikki } from './game';
import { Card, Suit } from '../cards/card';
import { TikkiService } from '../tikkiservice';
describe('game', () => {
    it('should play a game', () => {

      let card: Card;
      const p1 = new TikkiPlayer(new EntityIdentifier(1), "Matti");
      const p2 = new TikkiPlayer(new EntityIdentifier(2), "Teppo");
      const firstGame = new Tikki(new EntityIdentifier(3));
      
      const x = TikkiService.getInstance();
      x.addGame(firstGame);
      
      const g = x.getGame(new EntityIdentifier(3));
      g.addPlayer(p1, p2);
      expect(g.getPlayers().length).toBe(2);
      g.start();
      g.makeTurn({player: p1, card: p1.getHand().cards[0]});
      const askedSuit = g.status().askedSuit;
      if (p2.hasSuit(askedSuit)) {
          card = p2.getHand().cards.find(c => c.suit as Suit === askedSuit as Suit);
      } else {
        card = p2.getHand().cards[0];
      };
      g.makeTurn({player: p2, card: card});
      console.log(g.status());
    });
});