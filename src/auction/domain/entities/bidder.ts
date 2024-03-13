export class Bidder {
  constructor(
    public readonly name: string,
    public readonly bids: number[]
  ) {
    this.validate();
  }

  validate() {
    if (!this.name || !this.bids) {
      throw new Error('Bad Request!');
    }
  }

  getHighestBid() {
    return this.bids.length > 0 ? Math.max(...this.bids) : 0;
  }
}
