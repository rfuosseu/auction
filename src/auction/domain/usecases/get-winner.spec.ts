import { Bidder } from '../entities/bidder';
import { Item } from '../entities/item';
import { IObtainItem } from '../interfaces/obtain-item.interface';
import { GetWinnerUseCase } from './get-winner';

describe('GetWinnerUseCase', () => {
  const auctionItemMock: IObtainItem = {
    getItem: () => new Item('H', 100)
  };
  const auctionWinner = new GetWinnerUseCase(auctionItemMock);

  it('shoud have no winners if no bidders', () => {
    expect(auctionWinner.getWinner([])).toBeUndefined();
  });

  it('shoud have no winners if bidders with no bids', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [] },
      { name: 'toto1', bids: [] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBeUndefined();
  });

  it('shoud have no winners if bidders with bids equals to 0', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [0] },
      { name: 'toto1', bids: [0, 0] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBeUndefined();
  });

  it('shoud set no winner if no bidders with bids above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [10, 50] },
      { name: 'toto1', bids: [55, 15] },
      { name: 'toto3', bids: [] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBeUndefined();
  });

  it('shoud set unique bidder as winner with the reserve price if bids above the reserve price', () => {
    const bidders: Bidder[] = [{ name: 'toto0', bids: [110, 50] }].map(
      ({ name, bids }) => new Bidder(name, bids)
    );
    expect(auctionWinner.getWinner(bidders)).toBe('toto0');
  });

  it('shoud set highest bidder as winner with the reserve price if only one bid above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [110, 50] },
      { name: 'toto1', bids: [10, 50] },
      { name: 'toto2', bids: [100, 50] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBe('toto0');
  });

  it('shoud set bidder as winner if bid matching the reserve price and no bid above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [11, 50] },
      { name: 'toto1', bids: [10, 50] },
      { name: 'toto2', bids: [100, 50] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBe('toto2');
  });

  it('shoud set highest bidder as winner with the reserve price if 2 bids and more above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'A', bids: [110, 130] },
      { name: 'B', bids: [] },
      { name: 'C', bids: [125] },
      { name: 'D', bids: [105, 115, 90] },
      { name: 'E', bids: [132, 135, 140] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBe('E');
  });

  it('shoud set last bidder as winner if 2 bidders with the same highest bid and winning price among non winning bids', () => {
    const bidders: Bidder[] = [
      { name: 'A', bids: [110, 130, 140] },
      { name: 'B', bids: [] },
      { name: 'C', bids: [125] },
      { name: 'D', bids: [105, 115, 90] },
      { name: 'E', bids: [132, 135, 140] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionWinner.getWinner(bidders)).toBe('E');
  });
});
