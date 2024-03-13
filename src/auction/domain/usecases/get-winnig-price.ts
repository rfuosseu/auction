import { Bidder } from '../entities/bidder';
import { IObtainItem } from '../interfaces/obtain-item.interface';
import { IRequestWinningPrice } from '../interfaces/request-winning-price.interface';

export class GetWinningPriceUseCase implements IRequestWinningPrice {
  constructor(private auctionItem: IObtainItem) {}

  getWinningPrice(bidders: Bidder[]): number {
    const item = this.auctionItem.getItem();
    let bidsAboveReservePrice = bidders
      .reduce((acc: number[], curr) => {
        if (curr.getHighestBid() > item.reservePrice) {
          acc.push(curr.getHighestBid());
        }
        return acc;
      }, [])
      .sort((b1, b2) => b2 - b1);

    bidsAboveReservePrice = [...new Set(bidsAboveReservePrice)];

    return bidsAboveReservePrice.length > 1
      ? bidsAboveReservePrice[1]
      : item.reservePrice;
  }
}
