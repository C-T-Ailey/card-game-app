import React from 'react'
import "./help.css"

export default function Help(props) {
    const Card = props.Card

    const rules = "Welcome to Seven Card Sloane, a single-player card game based on Texas Hold'Em Poker where your only opponent is your own sense of optimism. Seven hands of seven cards will be dealt out to you in sequence -- your goal is to bet on what the highest scoring hand to be dealt will be, with the option to go all-in on the initial bet or to make individual bets on whether the next hand will be better or worse than the last."

    const rulesTwo = "RULES\n\n1. Set your bet in the betting panel by choosing your predicted best hand and the chips you wish to bet.\n2. Shuffle the deck by clicking the Shuffle chip.\n3. Click the Deal chip to deal out your hands. Cards for winning hands will be highlighted.\n4. After the 7th hand is dealt, the game will end and any winning bets will be paid out."

  return (
    <div className='help-container'>
        <div className='header'>
            <h3>How to Play</h3>
        </div>
        <div className='help-content'>
            <p>{rules}</p>
            <p>{rulesTwo}</p>
        </div>
    </div>
  )
}
