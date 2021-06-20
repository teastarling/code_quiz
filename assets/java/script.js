var question = document.getElementById('question');
var quizContainer = document.getElementById('quizContainer');
var optionA = document.getElementById('optionA');
var optionB = document.getElementById('optionB');
var optionC = document.getElementById('optionC');
var optionD = document.getElementById('optionD');

var score = document.getElementById("score");
var timerElement = document.getElementById("timer")

var starter = document.getElementById('starter');
var startTitle = document.getElementById('startTitle');
var startBtn = document.getElementById('startBtn');

// Question object
var quesList = [ {
        question:'The right answer is red',
        option: ['a.)Blue','b.)Green','c.)Red','d.)Orange'],
        answer: "c"
    },
    {   question: 'The right answer is elephant',
        option: ['a.)Kangaroo','b.)Elephant','c.)Lizard','d.)Monkey'],
        answer: "b"
    },
    {
        question: 'The right answer is Africa',
        option: ['a.)Africa','b.)India','c.)Russia','d.)Australia'],
        answer: "a"
    }
]

var scoreCounter = 0;
var currentQuestion = 0;
var youWin = false;
var timerCount;
var timer;



function starterPosition() {
    getScore();

    question.style.visibility = "hidden";
    optionA.style.visibility = "hidden";
    optionB.style.visibility = "hidden";
    optionC.style.visibility = "hidden";
    optionD.style.visibility = "hidden";
    startTitle.style.visibility = "visible";
    startBtn.style.visibility = "visible";

    startTitle.style.fontSize = "x-large";
    startTitle.innerHTML = "Click to start!";
    startBtn.innerHTML = "Start"


    startBtn.addEventListener("click", displayQuestion);
    

    return;
}

function displayQuestion() {
    youWin = false;
    timerCount = 70;
    startTimer();

    var q = quesList[currentQuestion];
    console.log(currentQuestion);

    question.style.visibility = "visible";
    optionA.style.visibility = "visible";
    optionB.style.visibility = "visible";
    optionC.style.visibility = "visible";
    optionD.style.visibility = "visible";
    startTitle.style.visibility = "hidden";
    startBtn.style.visibility = "hidden";

    question.innerHTML = q.question;
    optionA.innerHTML = q.option[0];
    optionB.innerHTML = q.option[1];
    optionC.innerHTML = q.option[2];
    optionD.innerHTML = q.option[3];

    return;
}


function winner() {
    question.style.visibility = "hidden";
    optionA.style.visibility = "hidden";
    optionB.style.visibility = "hidden";
    optionC.style.visibility = "hidden";
    optionD.style.visibility = "hidden";
    startTitle.style.visibility = "visible";
    startBtn.style.visibility = "visible";

    startTitle.style.fontSize = "x-large";
    startTitle.innerHTML = "YOU WIN!";

    youWin = true;

    scoreCounter++;
    setScore();
    
    return;
}

function answerCheck(x) {
    if ((x === quesList[currentQuestion].answer) && (currentQuestion < (quesList.length - 1))) {
        answerCorrect();
        console.log("more questions");
    } else if ((x === quesList[currentQuestion].answer) && (currentQuestion === (quesList.length - 1))) {
        console.log("a winner is you");
        winner();
    } else {
       answerWrong();
    }
}
console.log(currentQuestion)

function answerCorrect() {
    currentQuestion++;
    displayQuestion();
}

function getScore() {
    var storedScore = localStorage.getItem("scoreCount");

    if (storedScore === null) {
        scoreCounter = 0;
    } else {
        scoreCounter = storedScore;
    }
    
    score.innerHTML = scoreCounter;
}

function setScore() {
    score.textContent = scoreCounter;
    localStorage.setItem("scoreCount", scoreCounter)
}

function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (youWin && timerCount > 0) {
          clearInterval(timer);
        }
      }
      if (timerCount === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

function answerWrong () {
    timerCount -= 10;
}

starterPosition();



