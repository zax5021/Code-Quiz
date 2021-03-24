var headerEl = document.querySelector("header")
var timerEl = document.querySelector("#timerCount");
var startButton= document.querySelector(".start-button");
var saveButton= document.querySelector("#save");
var quizContentEl= document.querySelector(".quizContent");
var startSectionEl= document.querySelector("#startSection");
var scoresSectionEl= document.querySelector("#scoresSection");
var initials= document.querySelector("#score-initials");
var navHighscores= document.querySelector("#Highscores");


var highScores = [];
var storedScores = [];
var isOver;
var score = "";
var chosenQuestion = "";
var timer = 60;
var questions = [
    {
        question: 'HTML: What tag is used to underline a word or line of text?', 
        answer: '<u>', 
        option1: '<li>', 
        option2: '<s>', 
        option3: '<ul>'
    },
     {
        question: 'What is a JavaScript element that represents either TRUE or FALSE values?',
        answer: 'Boolean',
        option1: 'Condition',
        option2: 'Event',
        option3: 'RegExp'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answer: 'alert("Hello World");' ,
        option1: 'alertBox("Hello World");',
        option2: 'msg("Hello World");',
        option3: 'msgBox("Hello World");'
    },
    {
        question: 'How do you call a function named "zacksFunction"?',
        answer: 'zacksFunction()  ',
        option1: 'call function zacksFunction()',
        option2: 'call zacksFunction()',
        option3: 'runtime = zacksFunction()'
    },
]
var qNumber = 0;
function shuffleArray() {
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
}
var answerKey = [];
var options =[];
questions.forEach(function(element){
    answerKey=answerKey.concat(element.answer);
})
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var questionTextEl = document.createElement("div");
var optionsListEl = document.createElement("ol");
var scoresListEl = document.createElement("ol");
var scoresEl = document.createElement("p");
var clearButton = document.createElement("button");
clearButton.setAttribute("id", "clear-scores-btn");
clearButton.textContent = "Clear Highscores";


optionsListEl.setAttribute("style", "line-height:1.5; font-size: 18px; list-style-position: inside")
console.log(questions.length)

function getQuestion (){
    if(qNumber >= questions.length){
        isOver= true;
        return;
    } else {
        chosenQuestion = questions[qNumber];
        // chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText = chosenQuestion.question;
        delete chosenQuestion.question
        console.log("questionText: " + questionText);
        options = Object.values(chosenQuestion);
        console.log(typeof options);
        function shuffle(options) {
            var n = options.length, t, i;
        
            while (n) {
        
            i = Math.floor(Math.random() * n--);
        
            t = options[n];
            options[n] = options[i];
            options[i] = t;
            }
        
            return ;
        }
        shuffle(options);
        console.log(options);
        potentialAnswers = options;
        console.log("question number is :"+ qNumber)
        qNumber = qNumber + 1;
        console.log("question number is :"+ qNumber)
        displayQuestion();
        }}

function displayQuestion(){
    if (isOver){
        gameOver();
        return;
    } else {
        quizContentEl.innerHTML = "";


        questionTextEl.textContent = questionText;
        quizContentEl.appendChild(questionTextEl);
        quizContentEl.appendChild(optionsListEl);

        questionTextEl.setAttribute("style", "margin-top: 50px;")

        optionsListEl.appendChild(li1);
        optionsListEl.appendChild(li2);
        optionsListEl.appendChild(li3);
        optionsListEl.appendChild(li4);



        var lis = optionsListEl.querySelectorAll("li");
        console.log(lis);
        for (var i = 0; i < lis.length; i++) {
        lis[i].textContent = potentialAnswers[i];
        console.log(potentialAnswers[i])
        // lis[i].setAttribute("style", "margin-top: 5px; border:solid;color: white; background-color:grey; padding-left:10px; padding-right:10px; border-radius:25px; margin-left:25%; width: fit-content;")
        if(answerKey.includes(potentialAnswers[i])){
            lis[i].setAttribute("data-correct", "1")
        } else {
            lis[i].setAttribute("data-correct", "0")
        }
        console.log(potentialAnswers[i]);
        } 
    }};
function answerquestion(event){
    var selected = event.target;
    console.log(event.target);
   
    if (selected.matches("li")) {
        var correct = selected.getAttribute("data-correct");
        if (correct !== "1"){
            if (timer > 16){
                timer = timer - 15;
        } else{
            timer = 0;
            timerEl.textContent = 0;
            isOver = true;
            gameOver(); 
    }}
        getQuestion();

    }
}

function countdown(){
    var timeInterval = setInterval(function () {
        timer --;
        timerEl.textContent = timer;
        
        if (timer < 1 ) {
            timer = 0;
            clearInterval(timeInterval);
            
            timerEl.textContent = 0;
            isOver = true; 
            gameOver();
            
        } if (isOver) {
            
            clearInterval(timeInterval);
            gameOver();
        }

    }, 1000);
}

function startGame () {
    if (!isOver){
    startSectionEl.innerHTML = "";
    getQuestion();
    countdown();
}};

function gameOver () {
    if (isOver){
        score= timer
        quizContentEl.innerHTML = "";
        questionTextEl.textContent = "Game over! See how your score compares by clicking 'View Highscores' above."
        quizContentEl.appendChild(questionTextEl);
        if(score===0){
            scoresEl.textContent = "Your Score was " + score + "... Refresh the page to try again." ;
            quizContentEl.appendChild(scoresEl);
        }   else {
            scoresEl.textContent = "Your Score was " + score + "!!!" ;
            quizContentEl.appendChild(scoresEl);
            scoresSectionEl.setAttribute("style", "display:block")
    } 
}
}
function saveHighScores(){
    var initUpper = initials.value
  playerHighScore = {
      currentScore: score,
      scoreInitials: initUpper.toUpperCase()
  };
  storedScores.push(playerHighScore);
  localStorage.setItem("globalHighScores", JSON.stringify(storedScores));
}
function renderTodos() { // the function that checks to see if there's any todo's stored in localStorage, and renders those on the page if so.
  // TODO: Describe the functionality of the following two lines of code.
  todoList.innerHTML = ""; // resetting html on unordered list.
  todoCountSpan.textContent = todos.length; //setting the todo count to = the number of todos
  
  // TODO: Describe the functionality of the following `for` loop. // for each to do in the list, creating an element with the data-index of i, and creating the complete button and appending it to the html under todo-list. 
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}



function sortScores(){
    storedScores.sort(function (a,b) {
        return b.currentScore- a.currentScore;
    });
};

function loadScores(){
    quizContentEl.innerHTML= "";
    scoresSectionEl.innerHTML= "";
    headerEl.innerHTML= "";

if (storedScores.length === 0) {
    questionTextEl.textContent = "There are no High Scores yet... which means the leaderboard is wide open! Refresh the page to test your knowledge."
    quizContentEl.appendChild(questionTextEl);
} else {
    questionTextEl.textContent = "The leaderboard, these are the best of the best. Refresh the page to test your knowledge."
    quizContentEl.appendChild(questionTextEl);
    quizContentEl.appendChild(scoresListEl);
    for (var i=0; i<storedScores.length; i++) {
    var topScore = storedScores[i];
    var score_li = document.createElement("li")
    score_li.textContent = "Initials: " + storedScores[i].scoreInitials + "          Score: " + storedScores[i].currentScore;
    score_li.setAttribute("style", "width:80%; white-space:pre; list-style-position: inside");
    score_li.setAttribute("class", "scores-list")
    scoresListEl.appendChild(score_li);
    }
    quizContentEl.appendChild(clearButton);
}
// alert("hello");
}

startButton.addEventListener("click", startGame);
optionsListEl.addEventListener("click", answerquestion);
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveHighScores();
    sortScores ();
    loadScores();
    });
clearButton.addEventListener("click", function(event) {
    var result = confirm("Are you sure you want to clear scores? It's permanent...")
    if (result){
    event.preventDefault();
    storedScores.length= 0;
    localStorage.setItem("globalHighScores", JSON.stringify(storedScores));
    loadScores();
}});
navHighscores.addEventListener("click", loadScores);

function init () {
    shuffleArray(questions);
    qNumber=0
    isOver = false;
    timerEl.textContent= timer;
    storedScores = JSON.parse(localStorage.getItem("globalHighScores"));
    sortScores();
}
init();

console.log(questions);