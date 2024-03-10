import React, { useEffect, useState } from 'react'
import "./betting.css"

export default function Betting(props) {

    const [chips,setChips] = useState(100)

    const [betAmount,setBetAmount] = useState(1)

    const [placedBet, setPlacedBet] = useState(0)

    const [selectedBestHand, setSelectedBestHand] = useState(0)



    useEffect(()=>{
        if (props.gameState === 2) {
            console.log(props.gameHands)
            if (props.gameHands.includes(handNames[selectedBestHand])) {
                console.log("You got the hand you bet on!")
                setChips(chips + (placedBet * handValues[handNames[selectedBestHand]]))
                setPlacedBet(0)
            } else {
                console.log("You have chosen... Poorly.")
                if (chips - placedBet < 0) {
                    setChips(0)
                } else {
                    setChips(chips - placedBet)
                }
                setPlacedBet(0)
            }
            props.setHandBet("unset")
        }
    },[props.gameState])

    const increaseOne = () => {
        if(chips > 0 && betAmount < chips){
            setBetAmount(betAmount+1)
            // setChips(chips-1)
        }
    }

    const increaseTen = () => {
        if(chips >= 10 && betAmount+10 < chips){
            setBetAmount(betAmount+10)
            // setChips(chips-10)
        }
    }

    const decreaseOne = () => {
        if(betAmount > 1){
            setBetAmount(betAmount-1)
            // setChips(chips+1)
        }
    }

    const decreaseTen = () => {
        if(betAmount > 10){
            setBetAmount(betAmount-10)
            // setChips(chips+10)
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

    const placeBet = () => {
        setPlacedBet(betAmount)
        props.setHandBet(handNames[selectedBestHand])
    }

    const handNames = ["One Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush!"]

    const handValues = {"One Pair": 2, "Two Pair": 3, "Three of a Kind": 4, "Straight": 5, "Flush": 6, "Full House": 10, "Four of a Kind": 12, "Straight Flush": 15, "Royal Flush!": 20}
    

  return (
    
    <div className='bet-container'>
        <div className='count-container'>
            Chips : {chips}
        </div>
        <div className='betting-buttons'>
            <div className='bet-amount-buttons'>
                <div className='decrement-buttons'>
                    <button className='bet-button bet-button-b' disabled={props.gameState === 1 ? true : false} onClick={() => decreaseTen()}>-10</button>
                    <button className='bet-button bet-button-r' disabled={props.gameState === 1 ? true : false} onClick={() => decreaseOne()}>-1</button>
                </div>
                <div className='bet-amount'>Bet {betAmount}</div>
                <div className='increment-buttons'>
                    <button className='bet-button bet-button-r' disabled={props.gameState === 1 ? true : false} onClick={() => increaseOne()}>+1</button>
                    <button className='bet-button bet-button-b' disabled={props.gameState === 1 ? true : false} onClick={() => increaseTen()}>+10</button>
                </div>
            </div>
            <div className='best-hand-buttons'>
                <button className='bet-button bet-button-b' disabled={props.gameState === 1 ? true : false} onClick={() => previous()}>{"<"}</button>
                <div className='selected-best'>
                    {handNames[selectedBestHand]}
                </div>
                <button className='bet-button bet-button-r' disabled={props.gameState === 1 ? true : false} onClick={() => next()}>{">"}</button>
            </div>
                <button className='place-bet' disabled={props.gameState === 1 ? true : false} onClick={() => placeBet()}>Place Bet</button>
        </div>
        <div className='placed-bet'>
            <div className='bet-on'>Placed Bet : {props.handBet === "unset" ? "No Bet" : `${placedBet} on ${props.handBet}`}</div>
        </div>
    </div>
    
  )
}
