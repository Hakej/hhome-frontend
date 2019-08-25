export class PokerCard {

  name = 'No Name';
  value = 0;

  constructor(name?: string, value?: number) {
    if (value === null) {
      this.value = value;
    }
    if (name !== undefined) {
      this.name = name;
    }
  }
}
