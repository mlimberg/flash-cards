const { expect } = require('chai')
const Card = require('./Card.js')
const Guess = require('./Guess.js')

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
