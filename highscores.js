// This webpage is not complete - it will save the initial inputs but it will not display
const initials = document.getElementById('initials');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const recentScore = localStorage.getItem('recentScore');
const finalScore = document.getElementById('finalScore');



const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxScoreDisplay = 5;

finalScore.innerText = recentScore;



initials.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !initials.value;
    
})

saveScore = e => {
    e.preventDefault();

    const score = {
        score: recentScore,
        name: initials.value
    };
    highScores.push(score);

    highScores.sort( (a,b)=> {
        return b.score - a.score;
    })
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    console.log(highScores);
};