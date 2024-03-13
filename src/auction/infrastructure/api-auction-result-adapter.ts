import { Bidder } from '../domain/entities/bidder';
import { IRequestWinner } from '../domain/interfaces/request-winner.interface';
import { IRequestWinningPrice } from '../domain/interfaces/request-winning-price.interface';

export class ApiAuctionResultAdapter {
  constructor(
    private auctionWinner: IRequestWinner,
    private auctionPrice: IRequestWinningPrice
  ) {}

  getAuctionResult(bidders: Bidder[]) {
    return {
      winner: this.auctionWinner.getWinner(bidders),
      price: this.auctionPrice.getWinningPrice(bidders)
    };
  }
}
