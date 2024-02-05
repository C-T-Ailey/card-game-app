import React from 'react'
import "./debug.css"

export default function Debug(props) {
    const Card = props.Card

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

      const allClubsStraightFlush = [
        new Card("Clubs", "Four", 3), 
        new Card("Clubs", "Six", 5), 
        new Card("Clubs", "Five", 4), 
        new Card("Clubs", "Ten", 9),
        new Card("Clubs", "Seven", 6), 
        new Card("Clubs", "Nine", 8), 
        new Card("Clubs", "Eight", 7) 
      ]
    
      const straightTwo = [
        new Card("Diamonds", "Three", 2), 
        new Card("Hearts", "Two", 1), 
        new Card("Spades", "Five", 4), 
        new Card("Clubs", "Four", 3), 
        new Card("Diamonds", "Four", 3), 
        new Card("Diamonds", "Six", 5), 
        new Card("Hearts", "Ace", 0)
      ]

      const sevenCardStraight = [
        new Card("Clubs", "Two", 1), 
        new Card("Diamonds", "Three", 2), 
        new Card("Spades", "Four", 3), 
        new Card("Diamonds", "Five", 4), 
        new Card("Hearts", "Six", 5), 
        new Card("Diamonds", "Seven", 6), 
        new Card("Clubs", "Eight", 7)
      ]
    
      const heartsFlush = [
        new Card("Diamonds", "Ten", 9), 
        new Card("Hearts", "Ace", 0), 
        new Card("Hearts", "Five", 4), 
        new Card("Hearts", "King", 12), 
        new Card("Hearts", "Jack", 10), 
        new Card("Hearts", "Queen", 11), 
        new Card("Diamonds", "Eight", 7)
      ]

      const aceStraight = [
        new Card("Diamonds", "Queen", 11), 
        new Card("Hearts", "Ten", 9), 
        new Card("Diamonds", "King", 12), 
        new Card("Diamonds", "Ace", 0), 
        new Card("Hearts", "Six", 5), 
        new Card("Diamonds", "Jack", 10), 
        new Card("Clubs", "Two", 1)
      ]

      const highDupeStraight = [
        new Card("Spades", "King", 12), 
        new Card("Hearts", "Ten", 9), 
        new Card("Clubs", "King", 12), 
        new Card("Spades", "Queen", 11), 
        new Card("Hearts", "Jack", 10), 
        new Card("Diamonds", "King", 12), 
        new Card("Clubs", "Nine", 8)
      ]

    const cheat = (hand) => {
        props.setPlayerHand(hand)
    }

  return (
    <div className='debug-container'>
        <div className='header'>
            <h3>Debug Menu</h3>
        </div>
        <div className='debug-buttons'>
            <button onClick={() => cheat(royalFlush)}>Royal Flush</button>
            <button onClick={() => cheat(testStraight)}>Straight</button>
            <button onClick={() => cheat(testStraightFlush)}>Straight Flush</button>
            <button onClick={() => cheat(allClubsStraightFlush)}>All-Clubs Straight Flush</button>
            <button onClick={() => cheat(sevenCardStraight)}>Seven-Card Straight</button>
            <button onClick={() => cheat(straightTwo)}>Straight #2</button>
            <button onClick={() => cheat(heartsFlush)}>Hearts Flush</button>
            <button onClick={() => cheat(aceStraight)}>Ace-High Straight</button>
            <button onClick={() => cheat(highDupeStraight)}>High Straight w/ dupes</button>
        </div>
    </div>
  )
}
