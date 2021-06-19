// Question objects

var quesList = [ {
        question:'The right answer is red',
        option: ['a.)Blue','b.)Green','c.)Red','d.)Orange']
    },
    {   question: 'The right answer is elephant',
        option: ['a.)Kangaroo','b.)Elephant','c.)Lizard','d.)Monkey']
    },
    {
        question: 'The right answer is Africa',
        option: ['a.)Africa','b.)India','c.)Russia','d.)Australia']
    }
]

var question = document.getElementById('question');
var questionContainer = document.getElementById('questionContainer');
var optionA = document.getElementById('optionA');
var optionB = document.getElementById('optionB');
var optionC = document.getElementById('optionC');
var optionD = document.getElementById('optionD');

function starterPosition() {

    optionA.style.visibility = "visible";
    optionB.style.visibility = "hidden";
    optionC.style.visibility = "hidden";
    optionD.style.visibility = "hidden";
    question.style.fontSize = "x-large";
    question.innerHTML = "Click to start!";
    optionA.innerHTML = "Start"


    optionA.addEventListener("click", displayQuestion1);
    

    return;
}

function displayQuestion1() {
    optionA.removeEventListener("click", displayQuestion1);

    optionA.style.visibility = "visible";
    optionB.style.visibility = "visible";
    optionC.style.visibility = "visible";
    optionD.style.visibility = "visible";
    question.innerHTML = quesList[0].question;
    optionA.innerHTML = quesList[0].option[0];
    optionB.innerHTML = quesList[0].option[1];
    optionC.innerHTML = quesList[0].option[2];
    optionD.innerHTML = quesList[0].option[3];
    

    optionC.addEventListener("click", displayQuestion2);

    return;
}

function displayQuestion2() {
    optionC.removeEventListener("click", displayQuestion2);

    question.innerHTML = quesList[1].question;
    optionA.innerHTML = quesList[1].option[0];
    optionB.innerHTML = quesList[1].option[1];
    optionC.innerHTML = quesList[1].option[2];
    optionD.innerHTML = quesList[1].option[3];


    optionB.addEventListener("click", displayQuestion3);

    return;
}

function displayQuestion3() {

    optionB.removeEventListener("click", displayQuestion3);

    question.innerHTML = quesList[2].question;
    optionA.innerHTML = quesList[2].option[0];
    optionB.innerHTML = quesList[2].option[1];
    optionC.innerHTML = quesList[2].option[2];
    optionD.innerHTML = quesList[2].option[3];


    optionA.addEventListener("click", winner);

    return;
}

function winner() {
    optionA.style.visibility = "hidden";
    optionB.style.visibility = "hidden";
    optionC.style.visibility = "hidden";
    optionD.style.visibility = "hidden";
    question.style.fontSize = "x-large";
    question.innerHTML = "YOU WIN!";

    stopImmediatePropagation();
    return;
}

starterPosition();



