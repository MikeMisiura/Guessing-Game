import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function GuessingGame() {

    const [totGuesses, setTotGuesses] = useState(0)
    const [luckyNunber, setluckyNunber] = useState(0)
    const [guess, setGuess] = useState(0)

    function newLuckyNumber() {
        setluckyNunber(Math.floor(Math.random() * (100 - 1) + 1))
    }

    function handleReset() {
        newLuckyNumber()
        setTotGuesses(0)
    }

    function handleGuess() {
        setTotGuesses(totGuesses + 1)
    }

    function getRandomInt(min, max) {
        return; // The maximum is exclusive and the minimum is inclusive
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
            <p>You have made {totGuesses} guesses.</p>
            <p>The Lucky Number is: {luckyNunber}</p>
            <Button variant="primary" onClick={handleGuess} >{' '}
                Guess
            </Button>
            <br />
            <Button variant="primary" onClick={handleReset} >{' '}
                Reset
            </Button>

        </div>
    );
}


export default GuessingGame;
