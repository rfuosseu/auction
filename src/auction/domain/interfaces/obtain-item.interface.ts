import { Item } from '../entities/item';

export interface IObtainItem {
  getItem(): Item;
}
