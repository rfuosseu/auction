import { Item } from '../domain/entities/item';
import { IObtainItem } from '../domain/interfaces/obtain-item.interface';

export class userAuctionItemAdapter implements IObtainItem {
  constructor(private item: Item) {}

  getItem(): Item {
    return this.item;
  }
}
