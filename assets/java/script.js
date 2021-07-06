// Variables with paths to different page elements from HTML
var starterContainerEl = document.getElementById('starterContainer');
var quizContainerEl = document.getElementById('quizContainer');
var inputContainerEl = document.getElementById('inputContainer');
var highScoreContainerEl = document.getElementById('highScoreContainer')
var scoreEl = document.getElementById("scores");
var timerEl = document.getElementById("timer")
var startBtn = document.getElementById('startBtn');
var submitEl = document.getElementById('submit');
var runScoresEl = document.getElementById('clickScore');
var question = document.getElementById('question');
var optionA = document.getElementById('optionA');
var optionB = document.getElementById('optionB');
var optionC = document.getElementById('optionC');
var optionD = document.getElementById('optionD');

// Question object array containing questions, array of possible answers, and correct answer choice
var quesList = [ {
        question:'An action that causes something to happen is?',
        option: ['a.)Code','b.)Program','c.)Event','d.)Display'],
        answer: "c"
    },
    {   question: 'What is a single instruction for a computer?',
        option: ['a.)Bug','b.)Command','c.)Target','d.)Click'],
        answer: "b"
    },
    {
        question: 'What is fixing errors or mistakes in coding?',
        option: ['a.)Debugging','b.)Decomposing','c.)Defeating','d.)Depression'],
        answer: "a"
    }
]

// global variables needed for functions below
var currentQuestion = 0;
var youWin = false;
var timerCount;
var timer;
var scoresAr = [];

// hides elements not currently in use. on click to start button, runs activateTimer function
function starterPosition() {
    starterContainerEl.hidden = false;
    quizContainerEl.hidden = true;
    inputContainerEl.hidden = true;
    highScoreContainerEl.hidden = true;

    startBtn.addEventListener("click", activateTimer);
    return;
}
// sets youWin to false to be sure timer does not stop, sets timer to start counting at 40sec, and then runs both the startTimer function and the displayQuestion function
function activateTimer () { 
    youWin = false;
    timerCount = 40;
    startTimer();
    displayQuestion();
}
// begins the timer, setting the interval for 1000 milliseconds(1 sec) and ticking down from 40 by 1 second. If timer is above 0 and you win is true, stop timer ticking down. If timer runs to 0, run winner function and stop timer ticking down.
function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        if (youWin && timerCount > 0) {
          clearInterval(timer);
        }
      }
      if (timerCount <= 0) {
        clearInterval(timer);
        winner();
      }
    }, 1000);
}
// hides the elements not in use, assigns variable q so correct question is picked from the object array, and runs that question with each of its options
function displayQuestion() {
    starterContainerEl.hidden = true;
    quizContainerEl.hidden = false;
    inputContainerEl.hidden = true;
    highScoreContainerEl.hidden = true;

    var q = quesList[currentQuestion];

    question.innerHTML = q.question;
    optionA.innerHTML = q.option[0];
    optionB.innerHTML = q.option[1];
    optionC.innerHTML = q.option[2];
    optionD.innerHTML = q.option[3];
    return;
}
// run by "onClick" on HTML side when answer button clicked. Checks the answer parameter give against the correct answer in the quesList object array. If correct, adds 1 to currentQuestion (as long as it is less than the length of quesList - 1) and runs the displayQuestion function again. If currentQuestion is equal to quesList length - 1, runs the winner function, and if the answer is wrong, it subtracts 10 seconds from the timerCount variable and the timer goes down by 10
function answerCheck(x) {
    if ((x === quesList[currentQuestion].answer) && (currentQuestion < (quesList.length - 1))) {
        currentQuestion++;
        displayQuestion();
    } else if ((x === quesList[currentQuestion].answer) && (currentQuestion === (quesList.length - 1))) {
        winner();
    } else {
        timerCount -= 10;
    }
}
// runs when all questions answered correctly or when timer reaches 0. Hides all elements not in use, sets "youWin" to "true" so clock stops, and runs the "setScore" function when submit button clicked
function winner() {
    starterContainerEl.hidden = true;
    quizContainerEl.hidden = true;
    inputContainerEl.hidden = false;
    highScoreContainerEl.hidden = true;
    youWin = true;

    submitEl.addEventListener("click", setScore);
    return;
}
// creates an array called "finalScore", and adds the time left along with the user initial input to this array. then pulls from what is already available in local storage and parses it from a string to an array before pushing the new entry to the end of the "finalScore" array and then stringifying the new array back down to a string in order to be stored in local storage
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
// hides unused elements. Clears timer in case it is clicked while quiz is active. Creates storedScores array parsing the scores string in the local storage back to an array. Then takes this array and creates a list element for each value within the array to create the "high score list" on the page
function getScore() {
    starterContainerEl.hidden = true;
    quizContainerEl.hidden = true;
    inputContainerEl.hidden = true;
    highScoreContainerEl.hidden = false;
    clearInterval(timer);

    var storedScores = JSON.parse(localStorage.getItem("scoresAr"));
    if (storedScores !== null) {
        scoresEl = storedScores;
    } 
    
    for (var i = 0; i < storedScores.length; i++) {
        var score = storedScores[i];
        var li = document.createElement("li");
        
        li.textContent = score;
        li.setAttribute("data-index", i);
        scoreEl.appendChild(li);
    }
}
// clears the local storage and refreshes the page to clear the dynamically created list away
function clearStorage () {
    localStorage.clear();
    location.reload();
}
// event listener on the "view score" button on the main page that runs function "getScore"
runScoresEl.addEventListener('click', getScore);
// starts page with the "starter position" function
starterPosition();



