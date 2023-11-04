import React from 'react';
import { BsFillSuitSpadeFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsFillSuitClubFill } from 'react-icons/bs'
import './Card.css';

export default function PlayingCard(props) {

  const convertValue = () => {
    let value = props.card.value
    if (value > 0 && value < 10){
      return value+1;
    } else {
      return props.card.rank.slice(0,1)
    }
  }

  const determineSuit = (sizeValue) => {
    const suit = props.card.suit
    if (suit === "Spades") {
      return <BsFillSuitSpadeFill size={sizeValue} style={{color: "black"}}/>
    }
    else if (suit === "Hearts") {
      return <BsFillSuitHeartFill size={sizeValue} style={{color: "red"}}/>
    }
    else if (suit === "Diamonds") {
      return <BsFillSuitDiamondFill size={sizeValue} style={{color: "red"}}/>
    }
    else if (suit === "Clubs") {
      return <BsFillSuitClubFill size={sizeValue} style={{color: "black"}}/>
    }
  }
  
  return (
    <div className='card-flex'>
        <div style={{background: !!props.winners.includes(props.card.name()) ? "linear-gradient(135deg, rgba(191,149,63,1) 0%, rgba(252,246,186,1) 50%, rgba(179,135,40,1) 100%)" : "linear-gradient(135deg, rgba(191,191,191,1) 0%, rgba(255,255,255,1) 50%, rgba(191,191,191,1) 100%)"}} className='card-template'>
          <div className='container-left'>
            <div className='suit-corner suit-left'>
              <span>{convertValue()}</span>
              {determineSuit(18)}
            </div>
          </div>
          <div className='container-centre'>
            <div className='suit-centre'>
              {determineSuit(32)}
            </div>
          </div>
          <div className='container-right'>
            <div className='suit-corner suit-right'>
              <span>{convertValue()}</span>
              {determineSuit(18)}
            </div>
          </div>
        </div>
      </div>
  )
}