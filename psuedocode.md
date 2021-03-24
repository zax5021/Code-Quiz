PsuedoCode homework 4:
Start Page html:
- start div
— Title
— Instructions
— Start Quiz Button
- Time: 0
- View Highscores Link

add css, but not perfect.

quiz js:
create variables for referencing Els
- start div
- highscores
- time
- Start Button

var for values
- timeRemaining
- highScores
- questions: Array of questions

Question
- question: String
- options: String[]
- answer: String (one of the options)

Create an array with questions. each question should be an object with the answers.

remove question from array when it’s picked?
Shuffle question array on game start

choose first question in shuffled array, remove array.question and shuffle potential answers

selecting an option (right or wrong) should move on to the next question.

once all questions are done display trigger game over state.

Timer
- start timer on game start
- if question is answered wrong, decrement by 15 seconds, and move to next question
- when time runs out or if a question in answered wrong with > 16 seconds left, trigger game over state

Game Over
- Remove all current html / quiz elements and display game over message and score
— score = time left at game over
- append input element and button so user can submit score with initials
-  on submit
— push new object with user’s last score and initials from the input field to the array of all high scores
— and send to localStorage
— trigger highscore display

High Score Display
- get highscores from local storage JSON parse
- sort by highscore and append as lis
- add clear scores button

Clear Scores
- add confirm prompt to button press
- set length of scores array to 0 to clear
- display empty high score message