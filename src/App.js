import logo from './logo.svg';
import './App.css';
import PlayingCard from './components/PlayingCard'
import { useEffect, useState } from 'react';

function App() {

  const [deckState, setDeckState] = useState([])
  const [deckDisplay, setDeckDisplay] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [handDisplay, setHandDisplay] = useState([])
  const [bestHand, setBestHand] = useState("")
  const [winners,setWinners] = useState([])
  const [gameState, setGameState] = useState("new")

  useEffect(()=>{
    checkKind()
  },[playerHand])

  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const reset = () => {
    setDeckState([])
    setDeckDisplay([])
    setPlayerHand([])
    setHandDisplay([])
  }

  class Deck {
      constructor(cards){
          this.cards = cards;
      }
  }

  let testDeck = new Deck([])

  // console.log(testDeck.cards)

  let hand = {
      cards:[]
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
  
  const drawCard = () => {
    const suits = ["Clubs","Diamonds","Hearts","Spades"]
    const ranks = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"]
    let value = 0
    
    const chooseSuit = () => {
      return suits[randInt(0,3)]
    }
    const chooseRank = () => {
      const rank = randInt(0,12)
      value = rank
      return ranks[rank]
    }
    
    const card = new Card(chooseSuit(), chooseRank(), value)
    return card
  }
  
//   console.log(drawCard())
  
  const stackDeck = () => {
    setGameState("new")
    let cards = []
    let cardNames = []
    while (cards.length < 52) {
        const newCard = drawCard();
        // console.log(cardNames.length,cardNames.includes(newCard.name()));
        if (!cardNames.includes(newCard.name())){
            cards.push(newCard);
            cardNames.push(newCard.name());
        }
    }
    // for (i = 0; i < 53; i++){
    //     const newCard = drawCard()
    //     console.log(cardNames.length,cardNames.includes(newCard.name()))
    //     if (!cardNames.includes(newCard.name())){
    //         cards.push(newCard)
    //         cardNames.push(newCard.name())
    //     }
    // }
    // testDeck.cards = cards
    console.log(cards)
    const clearCards = cards.map((card, key) => (
      
      <li>{card.rank} of {card.suit}</li>
      
    ))
    setDeckState(cards)
    setDeckDisplay(clearCards)
  }

  const drawHand = () => {
    setGameState("active")
    if(deckState.length >= 7){
      let allCards = Array.from(deckState)
      let cards = []
      while (cards.length < 7){
          cards.push(allCards.pop());
      }
      setDeckState(allCards)
  
      // const display = cards.map((card, key) => (
        
      //   <>
      //     {/* <li key={key}>{card.name()}</li> */}
      //     <PlayingCard hand={playerHand} card={card}></PlayingCard>
      //   </>
      // ))
      setPlayerHand(cards)
      // setHandDisplay(display)
      console.log(cards)
    } else {
      setGameState("game over")
      reset()
    }
  }

  // <PlayingCard hand={playerHand} card={card}></PlayingCard>

  let suits = {Clubs: 0, Diamonds: 0, Hearts: 0, Spades: 0}

  let names = []

  const checkFlush = () => {
    for (const suit in suits) {
      const element = suits[suit];
      if (element >= 5){
        console.log("Flush!")
        return `${suit} Flush`
        // setBestHand(`${suit} Flush`)
      }
      
    }
  }

  let straightValues = []

  const checkStraight = () => {
    let handCopy = Array.from(playerHand)
    let mapValues = handCopy.map(card => card.value).sort((a,b) => a - b)
    let uniqueValues = [...new Set(mapValues)]
    console.log(uniqueValues)
    let straightCount = 0
    uniqueValues.forEach(value => {
      let nextValueIndex = uniqueValues.indexOf(value)+1
      if(!straightValues.length && uniqueValues[nextValueIndex] === value+1){
        straightValues.push(value)
      }
      else if (straightValues[straightValues.length-1] === value-1){
        straightValues.push(value)
      }
      // if (straightCount === 4 && uniqueValues.indexOf(value) === uniqueValues.length-1){
      //   straightCount += 1;
      //   straightValues.push(value)
      // }
      // else if(uniqueValues[parseInt(valueIndex)] === value+1){
      //   straightCount += 1
      //   straightValues.push(value)
      // }

    })

    if (straightValues.length >= 5) {
      console.log("Straight!", straightValues)
      return true
    } else {
      return false
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
      playerHand.forEach(card => {
        if(suits[card.suit] >= 5){
          cardNames.push(card.name())
        }
      });
      setWinners(cardNames)
      setBestHand(checkFlush())
    }
    else if (checkStraight()) {
      let cardNames = []
      console.log("values", straightValues)
      playerHand.forEach(card => {
        if (straightValues.includes(card.value)){
          cardNames.push(card.name())
        }
      })
      setWinners(cardNames)
      setBestHand("Straight")
    }
    else if (Object.keys(winningHands).includes("Three of a Kind")) {
    setBestHand("Three of a Kind")
    }
    else if (Object.keys(winningHands).includes("Pair")){
      if (Object.keys(names).length === 2){
        setBestHand("One Pair")
      }
      else if (Object.keys(names).length > 4) {
        let pairValues = playerHand.filter(winningCard => names.includes(winningCard.name())).map(winningCard => winningCard.value)
        console.log(pairValues)
        console.log("Values =", Math.min(...pairValues))
        playerHand.forEach(card => {
          console.log("check:",card.value === Math.min(...pairValues))
          if (card.value === Math.min(...pairValues)) {
            names = names.splice(names.indexOf(card.name()), 1)
            console.log(names)
          }
        })
        setBestHand("Two Pair: THREE PAIR SPECIAL")
      } else {
        setBestHand("Two Pair")
      }
    }
    else if (!winningHands.length){
      setBestHand("No winning hand")
    }
  }

  // stackDeck();

  // drawHand();

  // let values = playerHand.map(card => card.value).sort((a,b) => a - b)
  let values = Array.from(playerHand).sort((a,b) => a.value - b.value)

  return (
    <div className="App">
      <div className='content-flex'>
        <h2>One-Hand Shandy</h2>
        <h4>A single-player poker game by Chris Ailey</h4>
        <button onClick={() => stackDeck()}>Shuffle</button>
        
        { deckState.length > 0 && gameState !== "game over" ? <button onClick={() => drawHand()}>Draw</button> : <></>}
        <div className='hand-flex'>
          { gameState !== "game over" ?
            playerHand.map(card => (
              <PlayingCard winners={winners} card={card}></PlayingCard>
            )) :
            <span>Game over. Take your winnings or take the loss, but the chips have fallen where they will.</span>
          }
        </div>
        <h3>Best hand: {bestHand}</h3>
      </div>

      {/* <div>
        {values.map(card => (
          <div><p style={{color: winners.includes(card.name() ? "#ffffff" : "#000000")}}>{card.name()}</p> <button onClick={() => console.log(winners.includes(card.name()))}></button> </div>
        ))
        }
      </div> */}

    </div>
  );
}

export default App;
