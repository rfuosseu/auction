import { Bidder } from '../entities/bidder';
import { Item } from '../entities/item';
import { IObtainItem } from '../interfaces/obtain-item.interface';
import { GetWinningPriceUseCase } from './get-winnig-price';

describe('GetWinningPriceUseCase', () => {
  const auctionItemMock: IObtainItem = {
    getItem: () => new Item('H', 100)
  };
  const auctionPrice = new GetWinningPriceUseCase(auctionItemMock);

  it('shoud return reserve price if no bidders', () => {
    expect(auctionPrice.getWinningPrice([])).toBe(100);
  });

  it('shoud return reserve price if bidders with no bids', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [] },
      { name: 'toto1', bids: [] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionPrice.getWinningPrice(bidders)).toBe(100);
  });

  it('shoud return reserve price if no bidders with bids above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [10, 50] },
      { name: 'toto1', bids: [55, 15] },
      { name: 'toto3', bids: [] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionPrice.getWinningPrice(bidders)).toBe(100);
  });

  it('shoud return reserve price if only one bid above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'toto0', bids: [110, 50] },
      { name: 'toto1', bids: [10, 50] },
      { name: 'toto2', bids: [100, 50] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionPrice.getWinningPrice(bidders)).toBe(100);
  });

  it('shoud return the highest bid of non winners if 2 bidders bids and more above the reserve price', () => {
    const bidders: Bidder[] = [
      { name: 'A', bids: [110, 130] },
      { name: 'B', bids: [] },
      { name: 'C', bids: [125] },
      { name: 'D', bids: [105, 115, 90] },
      { name: 'E', bids: [132, 135, 140] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionPrice.getWinningPrice(bidders)).toBe(130);
  });

  it('shoud return the highest bid of non winners if 2 bidders with the same highest bid and winning price among non winning bids', () => {
    const bidders: Bidder[] = [
      { name: 'A', bids: [110, 130, 140] },
      { name: 'B', bids: [] },
      { name: 'C', bids: [125] },
      { name: 'D', bids: [105, 115, 90] },
      { name: 'E', bids: [132, 135, 140] }
    ].map(({ name, bids }) => new Bidder(name, bids));
    expect(auctionPrice.getWinningPrice(bidders)).toBe(125);
  });
});
