const { expect } = require('chai')
const Card = require('./Card.js')
const Guess = require('./Guess.js')
const Deck = require('./Deck.js')
const Round = require('./Round.js')

describe('Card', () => {
  let card;

  beforeEach(() => {
    card = new Card ('What is the capital of Alaska?', 'Juneau')
  })


  it('should exist', () => {
    expect(true)
    expect(card).to.exist
  })

  it('should take a question and answer argument', () => {
    expect(card.question).to.equal('What is the capital of Alaska?')
    expect(card.answer).to.equal('Juneau')
  })

})

describe('Guess', () => {
  let card;

  beforeEach(() => {
    card = new Card ('What is the capital of Alaska?', 'Juneau')
  })

  it('should take in a response and card object as args', () => {
   const guess = new Guess('Juneau', card)

    expect(guess.response).to.equal('Juneau')
    expect(guess.card).to.equal(card)
  })

  it('should provide a positive reponse if guess is correct', () => {
    const guess = new Guess('Juneau', card)

    expect(guess.correct).to.equal(true)
    expect(guess.feedback()).to.equal('Correct!')
  })

  it('should provide feedback if guess is incorrect', () => {
    const guess = new Guess('Grizzley', card)

    expect(guess.correct).to.equal(false)
    expect(guess.feedback()).to.equal('Wrong!')
  })

})

describe('Deck', () => {
  let card1,
      card2,
      card3

  beforeEach(() => {
    card1 = new Card ('What is the capital of Alaska?', 'Juneau')
    card2 = new Card ('What is the capital of Minnesota?', 'St. Paul')
    card3 = new Card ('What is the capital of Colorado?', 'Denver')
  })

  it('should add a new deck of cards as an array', () => {
    const cards = [card1, card2, card3]
    const deck = new Deck(cards)

    expect(deck.cards).to.be.an('array')
    expect(deck.cards.length).to.equal(3)
    expect(deck.cards[0]).to.equal(card1)
  })

  it('should have a count method', () => {
    const cards = [card1, card2, card3]
    const deck = new Deck(cards)

    expect(deck.count()).to.equal(3)
  })
})

describe('Round', () => {
  let card1, card2, card3, cards, deck, round

  beforeEach(() => {
    card1 = new Card ('What is the capital of Alaska?', 'Juneau')
    card2 = new Card ('What is the capital of Minnesota?', 'St. Paul')
    card3 = new Card ('What is the capital of Colorado?', 'Denver')
    cards = [card1, card2, card3]
    deck = new Deck(cards)
    round = new Round(deck)
  })

  it('should take in a new deck', () => {
    expect(round.deck).to.equal(deck)
    expect(round.guesses).to.deep.equal([])
  })

  it('should show current card', () => {
    expect(round.currentCard()).to.equal(card1)

    round.recordGuess('Guess!')

    expect(round.currentCard()).to.equal(card2)
  })

  it('should log guesses', () => {
    const guess = 'Juneau'
    const expectedGuess = new Guess(guess, round.currentCard())

    round.recordGuess(guess)

    expect(round.guesses.length).to.equal(1)

    expect(round.guesses[0]).to.deep.equal(expectedGuess)
    expect(round.guesses[0].correct).to.equal(true)
    expect(round.guesses[0].feedback()).to.equal('Correct!')
  })

  it('should log correct guesses count', () => {
    const guess = 'Juneau'
    const correctThirdGuess = 'Denver'

    round.recordGuess(guess)

    expect(round.numberCorrect).to.equal(1)

    round.recordGuess('wrong guess')

    expect(round.numberCorrect).to.equal(1)

    round.recordGuess(correctThirdGuess)

    expect(round.numberCorrect).to.equal(2)
  })

  it('should provide number correct as percent', () => {
    const guess = 'Juneau'

    round.recordGuess(guess)

    expect(round.percentCorrect()).to.equal('100%')

    round.recordGuess('wrong!')

    expect(round.percentCorrect()).to.equal('50%')
  })
})
