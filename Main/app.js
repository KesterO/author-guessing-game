import { quotes } from '../Modules/quotes.js';

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const numQuotes = urlParams.get('num-quotes');

function getNumQuotes() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('num-quotes'), 10);
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

let totalQuotes = quotes.length;
//let numQuotes = getNumQuotes() || quotes.length; // Default to all quotes if parameter not found
let currentQuoteIndex = 0;
let trialsLeft = numQuotes;
let correctGuesses = 0;
let currentQuote = {};
//const selectedQuotes = quotes.slice(0, numQuotes); // Select the required number of quotes


const quoteElement = document.getElementById('quote');
const guessElement = document.getElementById('guess');
const resultElement = document.getElementById('result');
const previousQuoteButton = document.getElementById('previous-quote');
const nextQuoteButton = document.getElementById('next-quote');
const submitButton = document.getElementById('submit-guess');
const scoreElement = document.getElementById('score');

function displayQuote() {
    currentQuote = getRandomQuote();
    if (quotes.length > 0 && trialsLeft > 0) {
        // quoteElement.textContent = quotes[currentQuoteIndex].quote;
        quoteElement.textContent = currentQuote.quote;
        guessElement.value = '';
        resultElement.textContent = '';
    } else {
        quoteElement.textContent = 'Game over! Thanks for playing.';
        //resultElement.textContent = `Total Correct Guesses: ${correctGuesses} `;
        scoreElement.textContent = `Correct guesses: ${correctGuesses}`;
        guessElement.value = '';
        guessElement.disabled = true;
        submitButton.disabled = true;
        nextQuoteButton.disabled = true;
        previousQuoteButton.style.display = 'none';
        nextQuoteButton.style.display = 'none';
    }
}


submitButton.addEventListener('click', () => {
    const guess = guessElement.value.trim();
    if ( guess === ""){
        resultElement.textContent = 'Please input an author!';
        resultElement.style.color = 'burlywood';
        resultElement.style.fontWeight = 'bold';
        nextQuoteButton.disabled = true;
    }
    else if (guess.toLowerCase() === currentQuote.author.toLowerCase()) {
        correctGuesses++;
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'burlywood';
        resultElement.style.fontWeight = 'bold';
        nextQuoteButton.disabled = false;
    } else {
        resultElement.textContent = `Wrong! The correct author is ${currentQuote.author}.`;
        resultElement.style.color = 'burlywood';
        resultElement.style.fontWeight = 'bold';
        nextQuoteButton.disabled = false;
    }
    
    trialsLeft--;
});

previousQuoteButton.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex - 1) % quotes.length;
    displayQuote();
});

nextQuoteButton.addEventListener('click', () => {
    if (trialsLeft > 0) {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        displayQuote();
    } else if ( trialsLeft === 0 ) {
        quoteElement.textContent = 'Game over! Thanks for playing.';
        resultElement.textContent = `Your Score: ${correctGuesses} / ${numQuotes} `;
        guessElement.disabled = true;
        submitButton.disabled = true;
        previousQuoteButton.disabled = true;
        previousQuoteButton.style.display = 'none';
        nextQuoteButton.style.display = 'none';
        submitButton.style.display = 'none';
    }
});

displayQuote();

