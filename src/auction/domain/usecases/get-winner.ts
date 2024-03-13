import { Bidder } from '../entities/bidder';
import { IObtainItem } from '../interfaces/obtain-item.interface';
import { IRequestWinner } from '../interfaces/request-winner.interface';

export class GetWinnerUseCase implements IRequestWinner {
  constructor(private auctionItem: IObtainItem) {}

  getWinner(bidders: Bidder[]): string | undefined {
    let winner: string | undefined;
    let highestBid = this.auctionItem.getItem().reservePrice;

    bidders.forEach((bidder) => {
      if (bidder.getHighestBid() >= highestBid) {
        highestBid = bidder.getHighestBid();
        winner = bidder.name;
      }
    });

    return winner;
  }
}
