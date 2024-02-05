import logo from './logo.svg';
import shuffleChip from './images/shuffle_chip.png'
import drawChip from './images/draw_chip.png'
import drawChipInactive from './images/draw_chip_inactive.png'
import shuffleAudio from './sounds/shuffle.wav'
import dealAudio from './sounds/deal.wav'
import './App.css';
import PlayingCard from './components/PlayingCard'
import Debug from './components/Debug';
import Help from './components/Help';
import { useEffect, useState } from 'react';
import Betting from './components/Betting';

function App() {

  const debug = false

  const [deckState, setDeckState] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [bestHand, setBestHand] = useState("")
  const [winners,setWinners] = useState([])
  const [gameState, setGameState] = useState(0)    // 0 = inactive game, 1 = game in progress, 2 = game over
  const [handBet, setHandBet] = useState("unset")
  const [gameBet, setGameBet] = useState()
  const [gameHands, setGameHands] = useState([])

  const cardOutlines = [1, 2, 3, 4, 5, 6, 7]

  const suitNames = ["Clubs","Diamonds","Hearts","Spades"]
  const rankNames = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"]

  // use effect hook: run checkKind every time the playerHand updates
  useEffect(()=>{
    checkKind()
  },[playerHand])

  // use effect hook: whenever deckState updates, if gameState = 1 (active) and deck length is less than 7, set gameState = 2 (game over) and reset deckState
  useEffect(()=>{
    if( gameState === 1 && deckState.length < 7){
      setGameState(2);
      setDeckState([])
    }
  },[deckState])

  // use effect hook: whenever bestHand updates, add the bestHand value to the gameHands array -- otherwise, run bestHandCleanup and add the cleaned up bestHand to gameHands
  useEffect(()=>{
    if(bestHandCleanup() === false) {
      setGameHands([...gameHands, bestHand])
    } else {
      setGameHands([...gameHands, bestHandCleanup()])
    }
  },[bestHand])

  // returns a random integer between min and max values
  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // Function for returning clean hand names from hands with long variations, e.g. ace-high straight, clubs flush, two pair (three card special)
  const bestHandCleanup = () => {
    if (bestHand.slice(bestHand.length-8,bestHand.length) === "Straight"){
      return "Straight"
    }
    else if (bestHand.slice(bestHand.length-5,bestHand.length) === "Flush"){
      return "Flush"
    }
    else if (bestHand.slice(bestHand.length-1) === ")"){
      return "Two Pair"
    } else {
      return false
    }
  }
  
  // class constructor for each Card object
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

  // TEST CARDS

  // const testCardOne = new Card("Clubs", "Ace", 0)

  // const testCardTwo = new Card("Spades", "Eight", 7)

  // END TEST CARDS

  // 
  const compareArrays = (arr1, arr2) => {
    console.log(arr1, arr2)
    if (arr1.length === arr2.length){
      const endPoint = arr1.length
      for (let i = 0; i < endPoint; i++){
        if (arr1[i] !== arr2[i]){
          console.log("Arrays do not match.")
          return false
        }
      }
      return true
    } else {
      console.log("Arrays do not match.")
      return false
    }
  }

  // Generates a single card as part of stackDeck
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

  let suits = {Clubs: 0, Diamonds: 0, Hearts: 0, Spades: 0}

  let names = []

  let straightValues = []
  
  const checkStraight = () => {

    let handCopy = Array.from(playerHand)  // copy of player's hand

    let mapValues = handCopy.map(card => card.value).sort((a,b) => a - b)  // map the values of each card in hand's value, sorted from low-high

    let uniqueValues = [...new Set(mapValues)]  // all unique values from mapValues

    console.log(uniqueValues)
    
    uniqueValues.forEach(value => {

      let nextValueIndex = uniqueValues.indexOf(value)+1
      
      if(!!straightValues.length){  // if straightValues is populated
        if(uniqueValues[nextValueIndex] === value+1){
          straightValues.push(value)
        }
        else if (value === uniqueValues[uniqueValues.length-1] && straightValues[straightValues.length-1] === value-1) {
          straightValues.push(value)
        } else {
          straightValues = []
        }
      }

      if(!straightValues.length){  // if straightValues is unpopulated
        if(uniqueValues[nextValueIndex] === value+1){
          straightValues.push(value)
        } else {
          straightValues = []
        }
      }

      
    })
    
    console.log(straightValues)

    if (straightValues[straightValues.length-1] === 12 && uniqueValues.includes(0)){
      console.log("ace high") 
      straightValues.push(0)
      console.log(straightValues)
    }
    
    if (straightValues.length >= 5) {
      straightValues.splice(0,straightValues.length-5)
      if ((straightValues[4] === straightValues[0] + 4) || (straightValues[3] === 12 && straightValues[4] === 0)){
        console.log("Straight!", straightValues)
        return true
      }
    } else {
      return false
    }
  }

  let flushSuit = ""
  
  const checkFlush = () => {
    for (const suit in suits) {
      const element = suits[suit];
      if (element >= 5){
        console.log("Flush!")
        flushSuit = suit
        return `${suit} Flush`
      }
    }
  }
  
  const checkKind = () => {
    let handCopy = Array.from(playerHand)
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
      
      let flushHand = Array.from(playerHand).filter(card => card.suit === flushSuit).sort((a,b) => a.value - b.value)
      console.log(flushHand)

      let cardNames = flushHand.map(card => card.name()).splice(flushHand.length-5, 5)
      let cardValues = flushHand.map(card => card.value).splice(flushHand.length-5, 5)
      const royalValues = [0,9,10,11,12]
      
      let sortedValues = cardValues.sort((a,b) => (a - b))
      console.log("names",cardNames)
      console.log("values",cardValues)
      setWinners(cardNames)

      console.log(sortedValues)

      if (compareArrays(sortedValues,royalValues)) {
        setBestHand("Royal Flush!")
      }
      else if (checkStraight() && compareArrays(sortedValues, straightValues)){
        setBestHand("Straight Flush")
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
          {/* <h4>Bug reminders go here</h4> */}
        </div>
        <img className='chips' style={handBet === "unset" ? {opacity: "0.5"} : {}} src={shuffleChip} alt="shuffle button" draggable="false" onClick={handBet === "unset" ? () => console.log("Cannot start game without setting a bet") : () => stackDeck()}></img>
        
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
                    <PlayingCard  winners={winners} card={card}></PlayingCard>
                    )) :
                    <></>
              }
          </div>

          {/* <div id="test-hand">
              <div id="card-one">
                <PlayingCard winners={winners} card={testCardOne} />
              </div>
              <div id="card-two">
                <PlayingCard winners={winners} card={testCardTwo} />
              </div>
          </div> */}
          
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
        <h3>Best hand : <span className={bestHand === "Royal Flush!" ? "royal-flush" : ""}>{bestHand}</span></h3>
        <div>
          <div>Bet On : {handBet === "unset" ? "No Bet" : handBet}</div>
          <Betting gameState={gameState} bestHand={bestHand} handBet={handBet} setHandBet={setHandBet} gameBet={gameBet} setGameBet={setGameBet} gameHands={gameHands}/>
        </div>
      </div>


      { debug===true ?
        <Debug Card={Card} setPlayerHand={setPlayerHand}/>
        :
        <></>
      }

      <Help></Help>

    </div>
  );
}

export default App;
