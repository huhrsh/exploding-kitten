import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux';
import 'animate.css'

function Game({ user, setAlert, alert }) {
  const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''
  const [clickable, setClickable] = useState(true)
  const dispatch = useDispatch()
  // state to check if shuffle is clicked 
  const [shuffleCard, setShuffleCard] = useState(false)
  // counts number of defuses everytime user logs in 
  const numberOfDefuses = user?.inHand?.filter(card => card === 'Defuse').length || 0;
  const [hasDefuse, setHasDefuse] = useState(numberOfDefuses);
  // cards that are yet to be clicked
  const [deck, setDeck] = useState(user?.deck ? user?.deck : [])
  // cards that have been clicked
  const [inHand, setInHand] = useState(user?.inHand ? user?.inHand : [])

  // function that resets the game 
  async function newGame() {
    // generate random number of bombs and shuffle cards 
    let bombs = Math.floor(Math.random() * 3), shuffle = Math.random() < 0.3, cats = 5 - bombs * 2 - shuffle
    let temp = shuffle ? ["Shuffle"] : []
    while (bombs) {
      bombs--
      temp.push("Bomb")
      temp.push("Defuse")
    }
    while (cats) {
      cats--
      temp.push('Cat')
    }
    // shuffle the array in random manner 
    const shuffledArray = temp.sort(() => Math.random() - 0.5);
    setDeck(shuffledArray)
    setHasDefuse(0)
    setShuffleCard(false)
    setInHand([])
    const response = await fetch(apiUrl + '/update-user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, deck: shuffledArray, inHand: [] })
    })
    if (response.ok) {
      dispatch(setUser({ ...user, deck: shuffledArray, inHand: [] }));
    }
  }

  // start new game everytime component renders and the deck is empty
  useEffect(() => {
    if (user?.deck?.length === 0) {
      newGame()
    }
  }, [])

  // start new game when shuffle is clicked
  useEffect(() => {
    setTimeout(() => {
      if (alert == null && shuffleCard) {
        newGame()
      }
    }, 1000)
  }, [shuffleCard])

  // start new game everytime alert is changed and the deck is empty
  useEffect(() => {
    if (alert == null && user?.deck?.length === 0) {
      newGame()
    }
  }, [alert])

  // set alert to win when all the cards from deck have been clicked 
  useEffect(() => {
    if (!shuffleCard) {
      if (deck?.length && deck?.every(card => card === '-1')) {
        setTimeout(() => {
          setAlert('won')
        }, 1000)
      }
    }
  }, [deck])

  // function that handles card clicks 
  async function handleCardClick(index) {
    // if the card clicking process is yet to be completed, return, do not proceed 
    if (!clickable) return;
    setClickable(false);
    // add animation to the card clicked 
    let type = deck[index]
    const el = document.getElementById(type + index)
    el.classList.add('customFlip')
    // add time for animation 
    setTimeout(async () => {
      let temp1 = [...deck]
      let temp2 = [...inHand]
      temp1[index] = "-1"
      temp2[index] = type
      if (type === 'Shuffle') {
        setShuffleCard(true)
      }
      setDeck(temp1)
      setInHand(temp2)
      setTimeout(async () => {
        switch (type) {
          case "Cat":
            // continue if cat is clicked 
            break
          case "Bomb":
            if (hasDefuse) {
              setHasDefuse((prev) => prev - 1)
            }
            else {
              // set alert to lost if no defuses available 
              setAlert('lost')
            }
            break
          case "Defuse":
            setHasDefuse((prev) => prev + 1)
            break
          default:
            break;
        }
        // update in database and redux 
        if (type !== 'Shuffle') {
          const response = await fetch(apiUrl + '/update-user', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...user, deck: temp1, inHand: temp2 })
          })
          if (response.ok) {
            dispatch(setUser({ ...user, deck: temp1, inHand: temp2 }))
          }
        }
        setClickable(true)
      }, 1000)
    }, 300)
  }

  return (
    <>
      <section className='p-16 pb-20 w-screen h-[80vh] flex items-center justify-evenly flex-wrap'>
        {
          deck.map((card, index) => (
            card === '-1' ?
              // <div className='animate__animated animate__flipInY flex justify-center items-center text-3xl border h-full w-1/6 transform bg-red-800' style={{ transform: `rotateZ(${(index - 2) * 5}deg) translateY(${(index - 2) * (index - 2) * 12}px)` }} key={index}>{inHand[index]}</div> :
              // <div className='animate__animated border h-full w-1/6 transform' style={{ transform: `rotateZ(${(index - 2) * 5}deg) translateY(${(index - 2) * (index - 2) * 12}px)` }} id={card + index.toString()} onClick={() => { handleCardClick(index) }} key={index}></div>
              <div style={{ transform: `translateY(${(index - 2) * (index - 2) * 12}px)`, rotate: `${(index - 2) * 5}deg` }} className={`text-5xl customFlip rounded bg-gradient-to-bl  h-full w-1/5 flex items-center justify-center transform bg-gray-900 ${inHand[index] === 'Cat' || inHand[index] === 'Defuse' ? "from-amber-800 to-orange-600" : "from-rose-950 to-red-900"} `} key={index}>{inHand[index]}</div> :
              // <div className='shadow-lg  shadow-gray-950 contrast-125 cursor-pointer rounded h-full w-1/6 transform bg-gradient-to-br from-purple-950 to-violet-950 bg-cover' style={{backgroundImage:`url(${cardBg})`}}  id={card + index.toString()} onClick={() => { handleCardClick(index) }} key={index}>{}</div>
              <div className={`shadow-lg shadow-gray-900 cursor-pointer rounded h-full w-1/5 transform bg-gradient-to-br from-purple-900 to-violet-950 bg-cover`} style={{ transform: `translateY(${(index - 2) * (index - 2) * 12}px)`, rotate: `${(index - 2) * 5}deg` }} id={card + index.toString()} onClick={() => { handleCardClick(index) }} key={index}>{ }</div>
            // <div className='flipInY border h-full w-1/6 transform bg-red-800' style={{transform:`translateY(${(index-2)*(index-2)*12}px)`,rotate:`${(index-2)*5}deg`}} key={index}>{inHand[index]}</div>:
            // <div className='border h-full w-1/6 transform' style={{rotate:`${(index-2)*5}deg`, transform:`translateY(${(index-2)*(index-2)*12}px)`}} id={card + index.toString()} onClick={() => { handleCardClick(index) }} key={index}>{card}</div>
          ))
        }
      </section>
    </>
  );
}

export default Game;
