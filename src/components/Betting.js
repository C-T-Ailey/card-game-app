import React, { useState } from 'react'
import "./betting.css"

export default function Betting(props) {

    const [chips,setChips] = useState(100)

    const [betAmount,setBetAmount] = useState(1)

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

  return (
    
    <div className='bet-container'>
        <div className='count-container'>
            Chips: {chips} | Bet amount: {betAmount}
        </div>
        <div className='bet-buttons'>
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
    
  )
}
