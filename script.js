var timerEl = document.querySelector("#timerCount");
var startButton= document.querySelector(".start-button");
var quizContentEl= document.querySelector(".quizContent");
var startSectionEl= document.querySelector("#startSection");


var timeLimitSeconds = 100;
var highScore = "";
var chosenQuestion = "";
var timer;
var timerCount;
var questions = {
    question1: {
        question: 'HTML: What tag is used to underline a word or line of text?', 
        answer: '<u>', 
        option1: '<li>', 
        option2: '<s>', 
        option3: '<ul>'
    },
    question2: {
        question: 'What is a JavaScript element that represents either TRUE or FALSE values?',
        answer: 'Boolean',
        option1: 'Condition',
        option2: 'Event',
        option3: 'RegExp'
    }}
var allQuestions = [];
for(var key in questions) {
    allQuestions.push(questions[key]);
};
var questionsText = "";
var chosenQuestion = "";
var potentialAnswers =[];

var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var questionTextEl = document.createElement("div");
var optionsListEl = document.createElement("ol");

optionsListEl.setAttribute("style", "line-height:1.5; font-size: 18px; list-style-position: inside")



console.log(allQuestions);
console.log(quizContentEl);
console.log(questions.question2.answer);



function getQuestion (){
    if(allQuestions.length < 1){
        return;
    } else {
    chosenQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    questionText = chosenQuestion.question;
    delete chosenQuestion.question;
    console.log("questionText: " + questionText);
    console.log(chosenQuestion);
    var options = Object.values(chosenQuestion);
    console.log(options);
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
    }}

function displayQuestion(){
    console.log(potentialAnswers);
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
       lis[i].setAttribute("style", "margin-top: 5px; border:solid;color: white; background-color:grey; padding-left:10px; padding-right:10px; border-radius:25px; margin-left:25%; width: fit-content;")
       if(potentialAnswers[i]===questions.question1.answer || potentialAnswers[i]===questions.question2.answer){
           lis[i].setAttribute("data-correct", "1")
       } else {
           lis[i].setAttribute("data-correct", "0")
       }
       console.log(potentialAnswers[i]);
      }
        
    };
    //finish the wrong answer case (placeholder) and move to next question.
function answerquestion(event){
    var selected = event.target;
    console.log(event.target);
   
    if (selected.matches("li")) {
    var correct = selected.getAttribute("data-correct");
        if (correct === "0"){
            alert("wrong")
        } 
    // remove the selected question from the the possible choices and return to displayQuestion()

    }

        
     

}

function startGame () {
    isOver = false;
    startSectionEl.innerHTML = "";
    getQuestion();
    displayQuestion();
    ;
}



startButton.addEventListener("click", startGame);
optionsListEl.addEventListener("click", answerquestion);