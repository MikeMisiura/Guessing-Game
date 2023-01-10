import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import usePersistence from './usePersistence';
import styles from './GuessingGame.module.css';


function GuessingGame() {

    const [totGuesses, setTotGuesses] = usePersistence('totGuesses', 0)
    const [luckyNumber, setluckyNumber] = usePersistence('luckyNumber', 0)
    const [guess, setGuess] = useState(0)
    const [guessText, setGuessText] = useState("")

    useEffect(() => {
        if (luckyNumber === 0) {
            newLuckyNumber()
        }
    })

    useEffect(() => {
        if (guess === 0) {
            setGuessText(<p>Start Guessing!</p>)
        } else {
            if (guess === luckyNumber) {
                setGuessText(<p className={styles.win}>Congrats you guessed it in {totGuesses} tries!</p>)

            }
            else {

                if (guess > luckyNumber) {
                    setGuessText(<p>Guess lower than {guess}</p>)
                }
                else {

                    if (guess < luckyNumber) {
                        setGuessText(<p>Guess higher than {guess}</p>)
                    }
                }
            }
        }
    }, [guess, luckyNumber, totGuesses])

    function newLuckyNumber() {
        setluckyNumber(Math.floor(Math.random() * (101 - 1) + 1))
    }

    function handleReset() {
        setTotGuesses(0)
        setGuess(0)
        newLuckyNumber()
        setGuessText("")
    }

    function handleGuess(event) {
        event.preventDefault()
        setGuess(parseInt(event.target.guess.value))

        setTotGuesses(totGuesses + 1)
    }

    function guessForm() {
        return (
            <Form onSubmit={handleGuess}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter Guess"
                        name="guess"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" >{' '}
                    Guess
                </Button>

            </Form>

        )
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
            <p>You have made {totGuesses} guesses.</p>
            {guessForm()}
            <Button variant="primary" onClick={handleReset} >{' '}
                Reset
            </Button>
            {guessText}
        </div>
    );
}

export default GuessingGame;