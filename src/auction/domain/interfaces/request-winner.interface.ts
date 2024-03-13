import { Bidder } from '../entities/bidder';

export interface IRequestWinner {
  getWinner(bidders: Bidder[]): string | undefined;
}
