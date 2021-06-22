var quizContainerEl = document.getElementById('quizContainer');
var question = document.getElementById('question');
var optionA = document.getElementById('optionA');
var optionB = document.getElementById('optionB');
var optionC = document.getElementById('optionC');
var optionD = document.getElementById('optionD');

var scoreEl = document.getElementById("scores");
var timerEl = document.getElementById("timer")


var startTitle = document.getElementById('startTitle');
var startBtn = document.getElementById('startBtn');

var scoreTitleEl = document.getElementById('scoreSubTitle');
var initialsEl = document.getElementById('initials');
var submitEl = document.getElementById('submit');

var runScoresEl = document.getElementById('clickScore');


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


var currentQuestion = 0;
var youWin = false;
var timerCount;
var timer;
var scoresAr = [];



function starterPosition() {

    startTitle.style.fontSize = "x-large";
    startTitle.innerHTML = "Click to start!";
    startBtn.innerHTML = "Start"


    startBtn.addEventListener("click", activateTimer);
    

    return;
}

function activateTimer () {
    // document.getElementById("testHidden").hidden = true;
    youWin = false;
    timerCount = 70;
    startTimer();
    displayQuestion();
}

function displayQuestion() {

    var q = quesList[currentQuestion];

    question.innerHTML = q.question;
    optionA.innerHTML = q.option[0];
    optionB.innerHTML = q.option[1];
    optionC.innerHTML = q.option[2];
    optionD.innerHTML = q.option[3];

    return;
}


function winner() {

    youWin = true;

    submitEl.addEventListener("click", setScore);
    
    return;
}

function answerCheck(x) {
    if ((x === quesList[currentQuestion].answer) && (currentQuestion < (quesList.length - 1))) {
        answerCorrect();
    } else if ((x === quesList[currentQuestion].answer) && (currentQuestion === (quesList.length - 1))) {
        winner();
    } else {
       answerWrong();
    }
}

function answerCorrect() {
    currentQuestion++;
    displayQuestion();
}

function getScore() {

    var storedScores = JSON.parse(localStorage.getItem("scoresAr"));
    if (storedScores !== null) {
        scoresEl = storedScores;
    }
    console.log(storedScores);

    for (var i = 0; i < storedScores.length; i++) {
        var score = storedScores[i];
        var li = document.createElement("li");
        
        li.textContent = score;
        li.setAttribute("data-index", i);
        scoreEl.appendChild(li);
    }
}

function setScore() {
    var finalScore = ((initials.value) += (timerEl.textContent));
    
    if(localStorage.getItem('scoresAr') === null) {
        scoresAr = [];
    } else {
        scoresAr = JSON.parse(localStorage.getItem('scoresAr'));
    }
    
    scoresAr.push(finalScore);

    localStorage.setItem("scoresAr", JSON.stringify(scoresAr))
}

function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        if (youWin && timerCount > 0) {
          clearInterval(timer);
        }
      }
      if (timerCount === 0) {
        clearInterval(timer);
        winner();
      }
    }, 1000);
}

function answerWrong () {
    timerCount -= 10;
}


runScoresEl.addEventListener('click', getScore);


starterPosition();



