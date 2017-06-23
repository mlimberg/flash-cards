class Deck {
  constructor(cards) {
    this.cards = cards
  }

  count() {
    return this.cards.length
  }
}

module.exports = Deck
