import React, { useEffect } from 'react';
import './Card.css';

export default function PlayingCard(props) {
  
  // useEffect(() => {
  //   console.log(props.winners)
  
  // }, [props.winners])
  

  // let pips = ["pip","pip","pip","pip","pip"]
  
  return (
    <div className='card-flex'>
        <div style={{backgroundColor: !!props.winners.includes(props.card.name()) ? "green" : "white"}} className='card-template'>
          <div className='pips'>
            <p>{props.card.name()}</p>
            <p>{props.card.value}</p>
          </div>
        </div>
      </div>
  )
}
