import React, { useEffect, useState } from 'react'
import "./betting.css"

export default function Betting(props) {

    const [chips,setChips] = useState(100)

    const [betAmount,setBetAmount] = useState(1)

    const [selectedBestHand, setSelectedBestHand] = useState(0)



    useEffect(()=>{
        if (props.gameState === 2) {
            console.log(props.gameHands)
            if (props.gameHands.includes(handNames[selectedBestHand])) {
                console.log("You got the hand you bet on!")
                setChips(chips + (betAmount * handValues[handNames[selectedBestHand]]))
                setBetAmount(1)
            } else {
                console.log("You have chosen... Poorly.")
                if (chips - betAmount < 0) {
                    setChips(0)
                } else {
                    setChips(chips - betAmount)
                }
                setBetAmount(1)
            }
            props.setHandBet("unset")
        }
    },[props.gameState])

    const increaseOne = () => {
        if(chips > 0){
            setBetAmount(betAmount+1)
            setChips(chips-1)
        }
    }

    const increaseTen = () => {
        if(chips >= 10){
            setBetAmount(betAmount+10)
            setChips(chips-10)
        }
    }

    const decreaseOne = () => {
        if(betAmount > 1){
            setBetAmount(betAmount-1)
            setChips(chips+1)
        }
    }

    const decreaseTen = () => {
        if(betAmount > 10){
            setBetAmount(betAmount-10)
            setChips(chips+10)
        }
    }

    const previous = () => {
        if(selectedBestHand !== 0){
            setSelectedBestHand(selectedBestHand-1)
        } else {
            setSelectedBestHand(8)
        }
    }

    const next = () => {
        if(selectedBestHand !== 8){
            setSelectedBestHand(selectedBestHand+1)
        } else {
            setSelectedBestHand(0)
        }
    }

    const handNames = ["One Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush!"]

    const handValues = {"One Pair": 2, "Two Pair": 3, "Three of a Kind": 4, "Straight": 5, "Flush": 6, "Full House": 10, "Four of a Kind": 12, "Straight Flush": 15, "Royal Flush!": 20}
    

  return (
    
    <div className='bet-container'>
        <div className='count-container'>
            Chips : {chips} | Bet : {betAmount}
        </div>
        <div className='betting-buttons'>
            <div className='best-hand-buttons'>
                <button onClick={() => previous()}>{"<"}</button>
                <button onClick={() => props.setHandBet(handNames[selectedBestHand])}>{handNames[selectedBestHand]}</button>
                <button onClick={() => next()}>{">"}</button>
            </div>
            <div className='bet-amount-buttons'>
                <div className='decrement-buttons'>
                    <button onClick={() => decreaseTen()}>-10</button>
                    <button onClick={() => decreaseOne()}>-1</button>
                </div>
                <div className='increment-buttons'>
                    <button onClick={() => increaseOne()}>+1</button>
                    <button onClick={() => increaseTen()}>+10</button>
                </div>
            </div>
        </div>
    </div>
    
  )
}
