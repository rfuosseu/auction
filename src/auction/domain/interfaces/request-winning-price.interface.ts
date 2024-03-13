import { Bidder } from '../entities/bidder';

export interface IRequestWinningPrice {
  getWinningPrice(bidders: Bidder[]): number;
}
