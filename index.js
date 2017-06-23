const repl = require('repl');
const Card = require('./Card.js')
const Guess = require('./Guess.js')
const Deck = require('./Deck.js')
const Round = require('./Round.js')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let round;

function getQuestions() {
  return new Promise((resolve, reject) => {
    const path = 'file:///Users/mikelimberg/Desktop/turing/lessons/oop/questions.txt'
    let request = new XMLHttpRequest();
    request.open('GET', path);
    request.send()
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        resolve(request.responseText)
      }
    }
  })
}

getQuestions()
  .then(questions => {
    const qArray = questions.trim().split('\n').filter(question => question !== '')

    return qArray.map(question => {
      let pair = question.split(',')
      return { question: pair[0], answer: pair[1] }
    })

  })
  .then(questionObjects => {
    cards = setUpDeck(questionObjects)
    return cards
  })
  .then(cards => {
    return new Deck(cards)
  })
  .then(deck => {
    return new Round(deck)
  })
  .then(round => {
    
    repl.start({ prompt: '> ', eval: myEval })
  })

function setUpDeck(questions) {
  let cards = [];

  questions.forEach(question => {
    let card = new Card (question.question, question.answer)
    cards.push(card)
  })

  return cards
}

function welcome() {
  return 'Lets get started!'
}

welcome()




// repl.start('> ').context.m = msg;
