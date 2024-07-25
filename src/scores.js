document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const correctGuesses = urlParams.get('correct');
    const totalQuotes = urlParams.get('total');

    const elements = {
        finalScore: document.getElementById('final-score'),
        playAgain: document.getElementById('play-again'),
        scoreboard: document.getElementById('scoreboard')
    };

    if (elements.finalScore) {
        elements.finalScore.textContent = `Your Score: ${correctGuesses} / ${totalQuotes}`;
    }

    if (elements.playAgain) {
        elements.playAgain.addEventListener('click', () => {
            window.location.href = 'start.html';
        });
    }

    if (elements.scoreboard) {
        elements.scoreboard.classList.remove('hidden');
        elements.scoreboard.classList.add('show-scoreboard');
    }
});