var timerEl = document.querySelector("#timerCount");
var startButton= document.querySelector(".start-button");
var quizContentEl= document.querySelector(".quizContent");
var startSectionEl= document.querySelector("#startSection");

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
console.log(questions);
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
var scoresEl = document.createElement("p");

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

        questionTextEl.setAttribute("style", "margin-top: 50px; line-height:2")

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
            timerEl.textContent = 0;
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
        questionTextEl.textContent = "Game over! See how your score compares by viewing highscores."
        quizContentEl.appendChild(questionTextEl);
        scoresEl.textContent = "Your Score was " + score ;
        quizContentEl.appendChild(scoresEl);
    }
}

startButton.addEventListener("click", startGame);
optionsListEl.addEventListener("click", answerquestion);

function init () {
    shuffleArray(questions);
    qNumber=0
    isOver = false;
    timerEl.textContent= timer;
}
init();

console.log(questions);