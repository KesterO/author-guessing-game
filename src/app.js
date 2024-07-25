import { quotes } from './quotes.js';

let correctGuesses = 0;
let totalQuotes;
let currentQuote = {};
let timer;
let timeLeft;
const TIMER_DURATION = 15;
let hintVisible = false;

function getNumQuotes() {
    return parseInt(new URLSearchParams(window.location.search).get('num-quotes'), 10) || quotes.length;
}

totalQuotes = getNumQuotes();
let trialsLeft = totalQuotes;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    stopTimer();
    timeLeft = TIMER_DURATION;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            stopTimer();
            handleTimeOut();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `Time left: ${timeLeft}s`;
    }
}

function handleTimeOut() {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = `Time's up! The correct author is ${currentQuote.author}.`;
    }
    trialsLeft--;
    if (trialsLeft > 0) {
        setTimeout(displayQuote, 6000);
    } else {
        endGame();
    }
}

function displayQuote() {
    const quoteElement = document.getElementById('quote');
    const guessElement = document.getElementById('guess');
    const resultElement = document.getElementById('result');
    const nextQuoteButton = document.getElementById('next-quote');
    const showHintButton = document.getElementById('showHintBtn');

    currentQuote = getRandomQuote();
    if (quotes.length > 0 && trialsLeft > 0) {
        quoteElement.textContent = currentQuote.quote;
        guessElement.value = '';
        resultElement.textContent = '';

        if (nextQuoteButton) {
            nextQuoteButton.textContent = 'Next Quote';
        };

        // Reset hint visibility and button text
        hintVisible = false;
        if (showHintButton) {
            showHintButton.textContent = 'Show Hint';
            showHintButton.style.display = 'block';
        }

        hideHint();

        startTimer();
    } else {
        endGame();
    }
}

function submitGuess() {
    stopTimer();
    const guessElement = document.getElementById('guess');
    const resultElement = document.getElementById('result');
    const nextQuoteButton = document.getElementById('next-quote');

    if (guessElement && resultElement) {
        const guess = guessElement.value.trim().toLowerCase();
        const correctAuthor = currentQuote.author.toLowerCase();

        if (guess === correctAuthor) {
            correctGuesses++;
            resultElement.textContent = 'Correct!';
        } else {
            resultElement.textContent = `Wrong! The correct author is ${currentQuote.author}.`;
        }

        trialsLeft--;

        if (nextQuoteButton) {
            nextQuoteButton.disabled = false;
        }

        if (trialsLeft === 0) {
            endGame();
        }
    }
}

function endGame() {
    const elements = {
        quote: document.getElementById('quote'),
        guess: document.getElementById('guess'),
        result: document.getElementById('result'),
        submitGuess: document.getElementById('submit-guess'),
        nextQuote: document.getElementById('next-quote'),
        checkScores: document.getElementById('check-scores'),
        timer: document.getElementById('timer')
    };

    elements.quote.textContent = 'Game over! Thanks for playing.';
    elements.result.textContent = '';
    elements.guess.disabled = true;
    elements.submitGuess.disabled = true;
    elements.nextQuote.disabled = true;
    elements.nextQuote.style.display = 'none';
    elements.submitGuess.style.display = 'none';
    elements.checkScores.style.display = 'block';
    elements.timer.style.display = 'none';

    if (elements.checkScores) {
        elements.checkScores.addEventListener('click', () => {
            window.location.href = `scores.html?correct=${correctGuesses}&total=${totalQuotes}`;
        });
    };

    // Hide the hint button at the end of the game
    const showHintButton = document.getElementById('showHintBtn');
    if (showHintButton) {
        showHintButton.style.display = 'none';
    };

    stopTimer();
};

function toggleHint() {
    const hintDisplay = document.getElementById('hintDisplay');
    const showHintButton = document.getElementById('showHintBtn');

    if (!hintDisplay) {
        const newHintDisplay = document.createElement('div');
        newHintDisplay.id = 'hintDisplay';
        newHintDisplay.style.position = 'fixed';
        newHintDisplay.style.bottom = '60px';
        newHintDisplay.style.right = '20px';
        newHintDisplay.style.backgroundColor = 'burlywood';
        newHintDisplay.style.padding = '10px';
        newHintDisplay.style.borderRadius = '5px';
        newHintDisplay.style.display = 'none';
        newHintDisplay.style.fontWeight = 'bold';
        document.body.appendChild(newHintDisplay);
    };
    if (hintVisible) {
        hideHint();
    } else {
        showHint();
    };

    hintVisible = !hintVisible;
    if (showHintButton) {
        showHintButton.textContent = hintVisible ? 'Hide Hint' : 'Show Hint';
    };
};

function showHint() {
    const hintDisplay = document.getElementById('hintDisplay');
    if (hintDisplay) {
        hintDisplay.textContent = currentQuote.hint;
        hintDisplay.style.display = 'block';
    };
};

function hideHint() {
    const hintDisplay = document.getElementById('hintDisplay');
    if (hintDisplay) {
        hintDisplay.style.display = 'none';
    };
};

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-guess');
    const nextQuoteButton = document.getElementById('next-quote');
    const checkScoresButton = document.getElementById('check-scores');
    const showHintButton = document.getElementById('showHintBtn');

    if (submitButton) {
        submitButton.addEventListener('click', submitGuess);
    }

    if (nextQuoteButton) {
        nextQuoteButton.addEventListener('click', () => {
            stopTimer();
            if (trialsLeft > 0) {
                displayQuote();
            } else {
                endGame();
            }
        });
    }

    if (checkScoresButton) {
        checkScoresButton.addEventListener('click', () => {
            window.location.href = `scores.html?correct=${correctGuesses}&total=${totalQuotes}`;
        });
    };

    if (showHintButton) {
        showHintButton.addEventListener('click', toggleHint);
    };

    displayQuote();
});