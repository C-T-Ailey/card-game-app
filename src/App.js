import logo from './logo.svg';
import shuffleChip from './images/shuffle_chip.png'
import drawChip from './images/draw_chip.png'
import drawChipInactive from './images/draw_chip_inactive.png'
import shuffleAudio from './sounds/shuffle.wav'
import dealAudio from './sounds/deal.wav'
import './App.css';
import PlayingCard from './components/PlayingCard'
import { useEffect, useState } from 'react';

function App() {

  const [deckState, setDeckState] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [bestHand, setBestHand] = useState("")
  const [winners,setWinners] = useState([])
  const [gameState, setGameState] = useState(0)

  const cardOutlines = [1, 2, 3, 4, 5, 6, 7]

  const suitNames = ["Clubs","Diamonds","Hearts","Spades"]
  const rankNames = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"]

  useEffect(()=>{
    checkKind()
  },[playerHand])

  useEffect(()=>{
    if( gameState === 1 && deckState.length < 7){
      setGameState(2);
      setDeckState([])
    }
  },[deckState])

  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  class Deck {
      constructor(cards){
          this.cards = cards;
      }
  }

  
class Card {
    constructor(suit, rank, value) {
      this.suit = suit;
      this.rank = rank;
      this.value = value;
    };
    name() {
      return `${this.rank} of ${this.suit}`;
    }
  }

  const royalFlush = [
    new Card("Diamonds", "Queen", 11), 
    new Card("Diamonds", "Ten", 9), 
    new Card("Diamonds", "King", 12), 
    new Card("Diamonds", "Ace", 0), 
    new Card("Hearts", "Six", 5), 
    new Card("Diamonds", "Jack", 10), 
    new Card("Clubs", "Two", 1)
  ]
  
  const testStraight = [
    new Card("Clubs", "Two", 1), 
    new Card("Diamonds", "Three", 2), 
    new Card("Spades", "Six", 5), 
    new Card("Diamonds", "Seven", 6), 
    new Card("Hearts", "Eight", 7), 
    new Card("Diamonds", "Nine", 8), 
    new Card("Clubs", "Ten", 9)
  ]

  const testStraightFlush = [
    new Card("Clubs", "Two", 1), 
    new Card("Diamonds", "Three", 2), 
    new Card("Spades", "Six", 5), 
    new Card("Spades", "Seven", 6), 
    new Card("Spades", "Eight", 7), 
    new Card("Spades", "Nine", 8), 
    new Card("Spades", "Ten", 9)
  ]

  const buggedStraight = [
    new Card("Diamonds", "Three", 2), 
    new Card("Hearts", "Two", 1), 
    new Card("Spades", "Five", 4), 
    new Card("Clubs", "Four", 3), 
    new Card("Diamonds", "Four", 3), 
    new Card("Diamonds", "Six", 5), 
    new Card("Hearts", "Ace", 0)
  ]

  const cheat = () => {
    setPlayerHand(buggedStraight)
  }

  const drawCard = () => {

    let value = 0
    
    const chooseSuit = () => {
      return suitNames[randInt(0,3)]
    }
    const chooseRank = () => {
      const rank = randInt(0,12)
      value = rank
      return rankNames[rank]
    }
    
    const card = new Card(chooseSuit(), chooseRank(), value)
    return card
  }
  
  // Function for building the deck
  const stackDeck = () => {

    setPlayerHand([])

    setGameState(0)
    document.getElementById("shuffleAudio").play()
    let cards = []
    let cardNames = []

    while (cards.length < 52) {
        const newCard = drawCard();

        if (!cardNames.includes(newCard.name())){
            cards.push(newCard);
            cardNames.push(newCard.name());
        }
    }
    
    console.log(cards)
    setDeckState(cards)
  }

  // Function for drawing a seven-card hand
  const drawHand = () => {
    setGameState(1)
      document.getElementById("dealAudio").play()
      let allCards = Array.from(deckState)
      let cards = []
      while (cards.length < 7){
        cards.push(allCards.pop());
      }
      setDeckState(allCards)
      setPlayerHand(cards)
      console.log(cards)
  }

  const check = () => {
    console.log(checkStraight());
    console.log(checkFlush())
  }

  let suits = {Clubs: 0, Diamonds: 0, Hearts: 0, Spades: 0}

  let names = []

  
  let straightValues = []
  
  const checkStraight = () => {
    let handCopy = Array.from(playerHand)
    let mapValues = handCopy.map(card => card.value).sort((a,b) => a - b)
    let uniqueValues = [...new Set(mapValues)]
    console.log(uniqueValues)
    
    uniqueValues.forEach(value => {
      // index of the next value in the uniqueValues array = the index+1 of value
      let nextValueIndex = uniqueValues.indexOf(value)+1
      // if straightvalues is empty and the next value in uniqueValues = value + 1
      if(!straightValues.length && uniqueValues[nextValueIndex] === value+1){
        straightValues.push(value)
      }
      // else if the value at the end of straightvalues = value - 1
      else if (straightValues[straightValues.length-1] === value-1){
        straightValues.push(value)
      }
      else {
        straightValues = []
      }
      
    })
    
    console.log(straightValues)
    console.log(straightValues[straightValues.length-1])
    console.log(straightValues[straightValues.length-1] === 12)
    console.log(uniqueValues.includes(0))

    if (straightValues[straightValues.length-1] === 12 && uniqueValues.includes(0)){
      console.log("ace high") 
      straightValues.push(0)
      console.log(straightValues)
    }
    
    if (straightValues.length >= 5) {
      console.log("Straight!", straightValues)
      return true
    } else {
      return false
    }
  }
  
  const checkFlush = () => {
    for (const suit in suits) {
      const element = suits[suit];
      if (element >= 5){
        console.log("Flush!")
        return `${suit} Flush`
      }
      
    }
  }
  
  const checkKind = () => {
    let handCopy = Array.from(playerHand)
    let pairs = [] 
    let winningHands = {}
    
    handCopy.forEach(card => {
      suits[card.suit] += 1
      const matchingRank = handCopy.filter(filterCard => filterCard.rank === card.rank)
      console.log(matchingRank.length, matchingRank)
      if(matchingRank.length === 4){
        winningHands["Four of a Kind"] = [card.rank]
        names.push(card.name())
      }
      else if (matchingRank.length === 3){
        winningHands["Three of a Kind"] = [card.rank]
        names.push(card.name())
      }
      else if (matchingRank.length === 2){
        console.log(matchingRank.filter(cardName => cardName.name === card.name()))
        winningHands["Pair"] = [card.rank]
        names.push(card.name())
      }
    })
    
    console.log("Suits:",suits)
    console.log(winningHands)
    console.log(names)
    setWinners(names)

    if (Object.keys(winningHands).includes("Four of a Kind")){
      setBestHand("Four of a Kind")
    }
    else if (Object.keys(winningHands).includes("Three of a Kind") && (Object.keys(winningHands).includes("Pair"))){
      
      setBestHand(`Full House, ${winningHands["Three of a Kind"]}s over ${winningHands["Pair"]}s `)
      
    }
    
    else if(!!checkFlush()){
      let cardNames = []
      let cardValues = []
      playerHand.forEach(card => {
        if(suits[card.suit] >= 5){
          cardNames.push(card.name())
          cardValues.push(card.value)
        }
      });
      console.log(cardNames)
      console.log(cardValues)
      if(cardNames.length > 5){
        console.log(Math.min(cardValues))
        cardNames.splice(cardNames.indexOf(Math.min(cardValues)),1)
      }
      setWinners(cardNames)

      if(checkStraight()){
        console.log("Straight flush")
        if(straightValues[straightValues.length-1] !== 0){
          setBestHand("Straight Flush")
        } else {
          setBestHand("Royal Flush!")
        }
      } else {
        setBestHand(checkFlush())
      }
    }

    else if (checkStraight()) {
      let undupeCards = []
      let cardNames = []
      console.log("values", straightValues)
      if (straightValues.length > 5){
        let valuesDownToFive = Array.from(straightValues).slice(-5, straightValues.length)
        playerHand.forEach(card => {
          if (!undupeCards.includes(card.rank) && valuesDownToFive.includes(card.value)){
            cardNames.push(card.name())
            undupeCards.push(card.rank)
          }
        })
      } else {
        playerHand.forEach(card => {
          if (!undupeCards.includes(card.rank) && straightValues.includes(card.value)){
            cardNames.push(card.name())
            undupeCards.push(card.rank)
        }
      })
      }
      console.log(cardNames)
      setWinners(cardNames)
      setBestHand( `${rankNames[straightValues[straightValues.length - 1]]}-High Straight`)
    }
    else if (Object.keys(winningHands).includes("Three of a Kind")) {
    setBestHand("Three of a Kind")
    }
    else if (Object.keys(winningHands).includes("Pair")){
      if (Object.keys(names).length === 2){
        setBestHand("One Pair")
      }
      else if (Object.keys(names).length >= 4) {
        let pairValues = playerHand.filter(winningCard => names.includes(winningCard.name())).map(winningCard => winningCard.value)
        console.log(pairValues)
        console.log("Values =", Math.min(...pairValues))
        playerHand.forEach(card => {
          console.log("check:",card.value === Math.min(...pairValues))
          if (card.value === Math.min(...pairValues)) {
            // names = names.splice(names.indexOf(card.name()), 1)
            console.log(names)
          }
        })
        setBestHand(names.length === 4 ? "Two Pair" : "Two Pair (Three Pair Special)")
      } 
      // else {
      //   setBestHand("Two Pair")
      // }
    }
    else if (!winningHands.length){
      setBestHand("No winning hand")
    }
  }

  let values = Array.from(playerHand).sort((a,b) => a.value - b.value)

  return (
    <div className="App">
      <audio id="shuffleAudio" autoPlay={false} src={shuffleAudio}/>
      <audio id="dealAudio" autoPlay={false} src={dealAudio}/>
      <div className='content-flex'>
        <div id='title-area'>
          <h2>Seven-Card Sloane</h2>
          <h4>A single-player poker game by Chris Ailey</h4>
        </div>
        <img className='chips' src={shuffleChip} alt="shuffle button" draggable="false" onClick={() => stackDeck()}></img>
        
        <div className='card-area'>
          <div className='card-outlines'>
            {
              cardOutlines.map(outline => (
                <div className='card-outline'></div>
              ))
            }
          </div>
          <div className='hand-flex'>
              { playerHand.length ?
                playerHand.map(card => (
                  <PlayingCard winners={winners} card={card}></PlayingCard>
                  )) :
                  <></>
              }
          </div>
          
              { gameState === 2 ?
                  <div className='game-over-container'>
                    <div className='game-over-message'>
                      <span className='g-o'>Game over!</span><br/><span className='g-o-subline'>Take your winnings or take the loss, but the chips have fallen where they will.</span>
                    </div>
                  </div>
                  :
                  <></>
                }
          
        </div>
        <div id="draw-chip-area">
          <img className='chips' id='draw-chip' src={deckState.length > 0 && gameState !== 2 ? drawChip : drawChipInactive} alt="deal button" draggable="false" onClick={ deckState.length > 0 && gameState !== 2 ? () => drawHand() : () => console.log("Cannot deal out if game isn't active")}></img>
        </div>
        <h3>Best hand: <span className={bestHand === "Royal Flush!" ? "royal-flush" : ""}>{bestHand}</span></h3>
      </div>

      {/* <div><button onClick={() => cheat()}>Cheat</button></div> */}

    </div>
  );
}

export default App;
