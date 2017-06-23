class Guess {
  constructor(response, card) {
    this.response = response
    this.card = card
    this.correct = response === card.answer ? true : false
  }

  feedback() {
    if(this.correct) {
      return 'Correct!'
    } else {
      return 'Wrong!'
    }
  }
}

module.exports = Guess
