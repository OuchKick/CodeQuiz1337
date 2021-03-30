const subQuestion = document.getElementById("subQuestion");
const choiceChoices = Array.from(document.getElementsByClassName("choiceChoices"));
const questionTallyBar = document.getElementById('questionTally');
const scoreBar = document.getElementById('score');


let activeQ = {};
let score = 0;
let correctAnswer = false;
let questionTally = 0;
let questionPool = [];

// Pool of questions that will be chosen
let questions = [
    {
        question: 'Which beatboxer had a role in Men in Black II?',
        choice1: 'Biz Markie',
        choice2: 'Kenny Muhammad',
        choice3: 'Antoinette Clinton',
        choice4: 'Rahzel',
        answer: 1,
    },
    {
        question: 'Who won the first World Beatbox Championship?',
        choice1: 'Bee-Low',
        choice2: 'ScratchCat',
        choice3: 'RoxorLoops',
        choice4: 'Joel Turner',
        answer: 4,
    },
    {
    question: 'Which sound does NOT focus on the use of the voice?',
        choice1: 'Trumpet',
        choice2: 'Electric Guitar',
        choice3: 'Kazoo',
        choice4: 'Double Voice',
        answer: 3,
    },
    {
    question: 'Which singing technique formed the foundation of beatboxing?',
        choice1: 'Scatting',
        choice2: 'Yodeling',
        choice3: 'Khoomei',
        choice4: 'Polyphonic Overtone',
        answer: 1,
    },
    {
        question: 'Which country has the largest beatboxing scene?',
            choice1: 'America',
            choice2: 'Indonesia',
            choice3: 'Canada',
            choice4: 'Malaysia',
            answer: 2,
        },
];



const correctPoint = 10;
const totalQuestions = 5;

// Default data when game begins

startGame = () => {
    questionTally = 0;
    score = 0;
    questionPool = [...questions];
    console.log(questionPool);
    newQuestion();



};

// How it cycles through the question pool
newQuestion = () => {
    if(questionPool.length == 0 || questionTally >= totalQuestions){
        localStorage.setItem('recentScore', score);
        return window.location.assign("/highscores.html");
    }
    // Increases question count with each question
    questionTally++;
    questionTallyBar.innerText = questionTally + "/" + totalQuestions;
   const questionTotal = Math.floor(Math.random() * questionPool.length);
    activeQ = questionPool[questionTotal];
    subQuestion.innerText = activeQ.question;

    choiceChoices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = activeQ['choice' + number];
    });

    questionPool.splice(questionTotal, 1);

    correctAnswer = true;

};

choiceChoices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!correctAnswer) return;


        correctAnswer = false;
        const chosenChoice = e.target;
        const chosenAnswer = chosenChoice.dataset['number'];

       
            const answerCheck = chosenAnswer == activeQ.answer ? 'correct' : 'incorrect';

            if (answerCheck === 'correct') {
                increaseScore(correctPoint);
           
            }

         
            console.log(answerCheck);

            chosenChoice.parentElement.classList.add(answerCheck);
            setTimeout ( () => {
                chosenChoice.parentElement.classList.remove(answerCheck);
                newQuestion();
            }, 2000);

            
            

    });
});
// Once a question is answered correctly, the score is increased by 10
increaseScore = num => {
score +=num;
scoreBar.innerText = score;

}
// Timer
var timeLeft = 30;
    var elem = document.getElementById('some_div');
    
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        alert('Times Up!');
        window.location = '/highscores.html';
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
    }



startGame();
