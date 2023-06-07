import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import usePersistence from './usePersistence';
import styles from './GuessingGame.module.css';
import Confetti from './Confetti';

function GuessingGame() {
    const [totGuesses, setTotGuesses] = usePersistence('totGuesses', 0)
    const [luckyNumber, setluckyNumber] = usePersistence('luckyNumber', 0)
    const [guess, setGuess] = usePersistence('guess', 0)
    const [guessText, setGuessText] = useState("")
    const [win, setWin] = useState(false)

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
                setGuessText(<p className={styles.win}>Congrats! You guessed it in {totGuesses} tries!</p>)
                setWin(true)
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
        setWin(false)
    }

    function handleGuess(event) {
        event.preventDefault()
        setGuess(parseInt(event.target.guess.value))
        setTotGuesses(totGuesses + 1)
    }

    function guessForm() {
        return (
            <Form className={styles.form} onSubmit={handleGuess}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter Guess"
                        name="guess"
                        id={styles.inputBox}
                    />
                </Form.Group>
                <Button className={styles.btn} variant="primary" type="submit" >{' '}
                    Guess
                </Button>
            </Form>
        )
    }

    function confetti() {
        if (win) {
            return (<Confetti />)
        } 
        return
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p className={styles.think}>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
            <p>You have made {totGuesses} guesses.</p>
            <div className={styles.inputContainer}>{guessForm()}</div>
            {guessText}
            <Button className={styles.btn} variant="primary" onClick={handleReset} >{' '}
                Reset
            </Button>
            {confetti()}
        </div>
    );
}

export default GuessingGame;