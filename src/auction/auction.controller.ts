import { GetWinnerUseCase } from './domain/usecases/get-winner';
import { GetWinningPriceUseCase } from './domain/usecases/get-winnig-price';
import express from 'express';
import { userAuctionItemAdapter } from './infrastructure/user-auction-item.adapter';
import { ApiAuctionResultAdapter } from './infrastructure/api-auction-result-adapter';
import { Bidder } from './domain/entities/bidder';
import { Item } from './domain/entities/item';

export function GetResult(req: express.Request, res: express.Response) {
  const bidders = req.body.bidders.map(
    (b: { name: string; bids: number[] }) => new Bidder(b.name, b.bids)
  );
  const item = new Item(req.body.item.name, req.body.item.reservePrice);

  const auctionItem = new userAuctionItemAdapter(item);
  const auctionWinner = new GetWinnerUseCase(auctionItem);
  const auctionPrice = new GetWinningPriceUseCase(auctionItem);
  const auctionResult = new ApiAuctionResultAdapter(
    auctionWinner,
    auctionPrice
  );
  res.json(auctionResult.getAuctionResult(bidders));
}
