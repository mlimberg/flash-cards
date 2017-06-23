const Guess = require('./Guess.js')

class Round {
  constructor(deck) {
    this.deck = deck;
    this.guesses = [];
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
  }

  currentCard() {
    const index = this.guesses.length;
    return this.deck.cards[index]
  }

  recordGuess(guess) {
    const card = this.currentCard()
    const newGuess = new Guess(guess, card)

    if (newGuess.correct) {
      this.numberCorrect++
    } else {
      this.numberIncorrect++
    }

    this.guesses.push(newGuess)
  }

  percentCorrect() {
    const value = (this.numberCorrect / this.guesses.length) * 100

    return `${value}%`
  }
}

module.exports = Round
