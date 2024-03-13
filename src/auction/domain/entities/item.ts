export class Item {
  constructor(
    public readonly name: string,
    public readonly reservePrice: number
  ) {
    this.validate();
  }

  validate() {
    if (!this.name || !this.reservePrice) {
      throw new Error('Bad Request!');
    }
  }
}
