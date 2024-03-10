import React from 'react'
import "./help.css"
import { MdOutlineCancel } from "react-icons/md";

export default function Help(props) {
    const Card = props.Card

    const closeHelp = () => {
      props.setShowHelp(false)
    }

    const rules = "Welcome to Seven Card Sloane; a single-player card game based on Texas Hold'Em Poker, in which your only opponent is your own sense of optimism. Seven hands of seven cards will be dealt out to you in sequence -- your goal is to bet on what the highest scoring hand to be dealt will be and hope Lady Luck looks on you favourably!"

    const rulesForFinal = "Welcome to Seven Card Sloane; a single-player card game based on Texas Hold'Em Poker, in which your only opponent is your own sense of optimism. Seven hands of seven cards will be dealt out to you in sequence -- your goal is to bet on what the highest scoring hand to be dealt will be, with the option to go all-in on the initial bet or to make individual bets on whether the next hand will be better or worse than the last."

    const rulesTwo = "1. Set your bet in the Betting panel by choosing your predicted best hand and the amount of chips you wish to bet.\n\n2. Ready the deck by clicking the Shuffle chip. You can click the Shuffle chip again at any time to reset the game.\n\n3. Click the Deal chip to deal out your hand. Cards for winning hands will be highlighted.\n\n4. After the 7th hand is dealt, the game will end and any winning bets will be paid out."

    const payouts = "One Pair: 1 : 2 \n Two Pair: 1 : 3 \n Three of a Kind: 1 : 4 \n Straight: 1 : 5 \n Flush: 1 : 6 \n Full House: 1 : 10 \n Four of a Kind: 1 : 12 \n Straight Flush: 1 : 15 \n Royal Flush: 1 : 20"

    // "One Pair": 2, "Two Pair": 3, "Three of a Kind": 4, "Straight": 5, "Flush": 6, "Full House": 10, "Four of a Kind": 12, "Straight Flush": 15, "Royal Flush!": 20

  return (
    <div className='help-container' style={!!props.showHelp ? {visibility:"visible"} : {visibility:"hidden"}}>
      <div className='help-window'>
          <MdOutlineCancel className='close-help' size={32} onClick={() => closeHelp()}/>
          <div className='help-content'>
              <p>{rules}</p>
              <h2>How to Play</h2>
              <p>{rulesTwo}</p>
          </div>
      </div>
    </div>
  )
}
