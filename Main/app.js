import { quotes } from '../Modules/quotes.js';

let currentQuoteIndex = 0;

const quoteElement = document.getElementById('quote');
const guessElement = document.getElementById('guess');
const resultElement = document.getElementById('result');
const previousQuoteButton = document.getElementById('previous-quote')
const nextQuoteButton = document.getElementById('next-quote');

function displayQuote() {
    quoteElement.textContent = quotes[currentQuoteIndex].quote;
    guessElement.value = '';
    resultElement.textContent = '';
}

document.getElementById('submit-guess').addEventListener('click', () => {
    const guess = guessElement.value.trim();
    if (guess.toLowerCase() === quotes[currentQuoteIndex].author.toLowerCase()) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'burlywood';
    } else {
        resultElement.textContent = `Wrong! The correct author is ${quotes[currentQuoteIndex].author}.`;
        resultElement.style.color = 'burlywood';
    }
});

previousQuoteButton.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex - 1) % quotes.length;
    displayQuote();
});

nextQuoteButton.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote();
});

displayQuote();
