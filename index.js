const quotes = [
    { quote: "To be, or not to be: that is the question.", author: "William Shakespeare" },
    { quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", author: "Jane Austen" },
    { quote: "All happy families are alike; each unhappy family is unhappy in its own way.", author: "Leo Tolstoy" },
    { quote: "It was the best of times, it was the worst of times.", author: "Charles Dickens" },
    { quote: "I think therefore I am.", author: "René Descartes" }
];

let currentQuoteIndex = 0;

const quoteElement = document.getElementById('quote');
const guessElement = document.getElementById('guess');
const resultElement = document.getElementById('result');
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
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Wrong! The correct author is ${quotes[currentQuoteIndex].author}.`;
        resultElement.style.color = 'red';
    }
});

nextQuoteButton.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote();
});

displayQuote();
