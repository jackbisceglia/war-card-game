export type SpecialCard = (typeof specialCards)[number];
export type NumberCard = (typeof numberCards)[number];
export type GenericCard = SpecialCard | NumberCard;
export type Suit = (typeof suits)[number];

const suits = ["Spades", "Hearts", "Clubs", "Diamonds"] as const;
const numberCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const specialCards = ["A", "K", "Q", "J"] as const;

const allCards: GenericCard[] = [...numberCards, ...specialCards];

type CardType = "Number" | "Special";

export class Card {
  suit: Suit;
  type: CardType;
  ident: GenericCard;
  value: number;

  constructor(suit: Suit, type: CardType, ident: GenericCard, value: number) {
    this.suit = suit;
    this.type = type;
    this.ident = ident;
    this.value = value;
  }

  betterThan(card: Card) {
    return this.value > card.value;
  }
}

export class CardBuilder {
  private _suit!: Suit;
  private _type!: CardType;
  private _ident!: GenericCard;

  constructor() {
    return this;
  }

  suit(suit: Suit) {
    this._suit = suit;
    return this;
  }

  type(type: CardType) {
    this._type = type;
    return this;
  }

  // derive value from ident
  ident(type: GenericCard) {
    this._ident = type;
    return this;
  }

  build() {
    return new Card(
      this._suit,
      this._type,
      this._ident,
      allCards.indexOf(this._ident)
    );
  }
}

// const createDeck = () => {
export const deck = allCards.flatMap((ident) => {
  return suits.map((suit) => {
    return new CardBuilder()
      .suit(suit)
      .ident(ident)
      .type(typeof ident === "number" ? "Number" : "Special")
      .build();
  });
});
