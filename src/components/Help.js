import React from 'react'
import "./help.css"
import PlayingCard from './PlayingCard'
import { MdOutlineCancel } from "react-icons/md";

export default function Help(props) {
    const Card = props.Card

    const closeHelp = () => {
      props.setShowHelp(false)
    }

    const rules = "Welcome to Seven Card Sloane; a single-player card game based on Texas Hold'Em Poker, in which your only opponent is your own sense of optimism. Seven hands of seven cards will be dealt out to you in sequence -- your goal is to bet on a scoring hand which you predict will be dealt to you, and hope Lady Luck looks on you favourably!"

    const rulesForFinal = "Welcome to Seven Card Sloane; a single-player card game based on Texas Hold'Em Poker, in which your only opponent is your own sense of optimism. Seven hands of seven cards will be dealt out to you in sequence -- your goal is to bet on what the highest scoring hand to be dealt will be, with the option to go all-in on the initial bet or to make individual bets on whether the next hand will be better or worse than the last."

    const rulesTwo = "1. Place your bet by selecting the amount of chips you wish to bet, a scoring hand you predict you will draw, and then clicking the Place Bet button.\n\n2. Click the Shuffle chip to ready the deck and start the game.\n\n3. Click the Deal chip to deal out a hand. Cards for scoring hands will be automatically highlighted and registered, and if a scoring hand matches the one on which you placed your bet, you can consider the game won.\n\n4. After dealing your 7th hand, the game will end and winning bets will be paid out. You can then begin a new game by repeating step 1."

    const payouts = "One Pair: 1 : 1 \n Two Pair: 1 : 2 \n Three of a Kind: 1 : 3 \n Straight: 1 : 4 \n Flush: 1 : 5 \n Full House: 1 : 10 \n Four of a Kind: 1 : 12 \n Straight Flush: 1 : 15 \n Royal Flush: 1 : 20"

    // new Card("", "", 0)

    const onePair = [
      new Card("Spades", "Jack", 10),
      new Card("Hearts", "Jack", 10)
    ]

    const twoPair = [
      new Card("Spades", "Jack", 10),
      new Card("Hearts", "Jack", 10),
      new Card("Clubs", "Four", 5),
      new Card("Diamonds", "Four", 5)
    ]

    const threeKind = [
      new Card("Clubs", "Five", 4),
      new Card("Diamonds", "Five", 4),
      new Card("Hearts", "Five", 4)
    ]

    const straight = [
      new Card("Clubs", "Ace", 0),
      new Card("Diamonds", "Two", 1), 
      new Card("Hearts", "Three", 2), 
      new Card("Spades", "Four", 3), 
      new Card("Clubs", "Five", 4) 
    ]

    const flush = [
      new Card("Spades", "Two", 1), 
      new Card("Spades", "Five", 4), 
      new Card("Spades", "Nine", 10), 
      new Card("Spades", "Ten", 9), 
      new Card("Spades", "King", 12)
    ]

    const fullHouse = [
      new Card("Clubs", "Three", 2),
      new Card("Diamonds", "Three", 2),
      new Card("Hearts", "Three", 2),
      new Card("Spades", "Seven", 6),
      new Card("Hearts", "Seven", 6)
    ]
    
    const fourKind = [
      new Card("Spades", "Ace", 0),
      new Card("Hearts", "Ace", 0),
      new Card("Clubs", "Ace", 0),
      new Card("Diamonds", "Ace", 0)
    ]

    const straightFlush = [
      new Card("Spades", "Four", 3),
      new Card("Spades", "Five", 4), 
      new Card("Spades", "Six", 5), 
      new Card("Spades", "Seven", 6), 
      new Card("Spades", "Eight", 7)
    ]

    const royalFlush = [
      new Card("Hearts", "Ten", 9), 
      new Card("Hearts", "Jack", 10), 
      new Card("Hearts", "Queen", 11), 
      new Card("Hearts", "King", 12), 
      new Card("Hearts", "Ace", 0)
    ]

  return (
    <div className='help-container' style={!!props.showHelp ? {visibility:"visible"} : {visibility:"hidden"}}>
      <MdOutlineCancel className='close-help' size={42} onClick={() => closeHelp()}/>
      <div className='help-window'>
          <div className='help-content'>
              <p>{rules}</p>
              <h2>How to Play</h2>
              <p>{rulesTwo}</p>
              <h2>Poker Hands Glossary</h2>
              <p>One Pair: Two cards of the same rank.</p>
              <div className='help-cards'>
                {onePair.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Two Pair: Two pairs of cards, each pair with matching ranks.</p>
              <div className='help-cards'>
              {twoPair.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Three of a Kind: Three cards of the same rank.</p>
              <div className='help-cards'>
              {threeKind.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Straight: Five cards of different suits with sequential ranks.</p>
              <div className='help-cards'>
              {straight.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Flush: Five cards of different ranks with the same suit.</p>
              <div className='help-cards'>
              {flush.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Full House: Three of a Kind and One Pair in the same hand.</p>
              <div className='help-cards'>
              {fullHouse.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Four of a Kind: One card of each suit in the same rank.</p>
              <div className='help-cards'>
              {fourKind.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Straight Flush: Five cards of the same suit with sequential ranks.</p>
              <div className='help-cards'>
              {straightFlush.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <p>Royal Flush: A Ten, Jack, Queen, King and Ace of the same suit.</p>
              <div className='help-cards'>
              {royalFlush.map((card, index) => (
                  <PlayingCard key={index} winners={[]} card={card}></PlayingCard>
                ))}
              </div>
              <div style={{marginBottom: "2em"}}></div>
          </div>
      </div>
    </div>
  )
}
