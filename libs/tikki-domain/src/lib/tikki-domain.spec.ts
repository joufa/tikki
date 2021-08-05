import { tikkiDomain } from './tikki-domain';
import { Deck } from './cards/deck';
import { Player, TikkiPlayer } from './player/player';
import { EntityIdentifier } from './interfaces/entitityidentifier';
import { Tikki } from './game/game';
import { TikkiService } from './tikkiservice';

describe('tikkiDomain', () => {
  it('should work', () => {
    expect(tikkiDomain()).toEqual('tikki-domain');
  });
  it('should create a deck of cards', () => {
    let deck = new Deck();
    console.log(deck.size());
    deck.shuffle();
    let cards = deck.draw(5);
    cards.forEach(card => {
      console.log(card.toString());
    });
  });

  it('should play a game', () => {
    let p1 = new TikkiPlayer(new EntityIdentifier(1), "Matti");
    let p2 = new Player(new EntityIdentifier(2), "Teppo");

    const game = new Tikki(new EntityIdentifier(123));
    game.addPlayer(p1);
    game.addPlayer(p2);
    game.start();
    game.getPlayers()[0].showCards();
    game.status();
  });
  it('instance', () => {
    TikkiService.init();
    let tikki = TikkiService.getInstance();
  });
});
