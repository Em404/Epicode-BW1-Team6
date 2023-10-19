let timeLeft = 60;
let timer = document.getElementById("timeLeft");

function isTimeLeft() {
  return timeLeft > -1;
}

function runTimer(timerElement) {
  const timerCircle = timerElement.querySelector("svg > circle + circle");
  timerElement.classList.add("animatable");
  timerCircle.style.strokeDashoffset = 1;

  let countdownTimer = setInterval(function () {
    if (isTimeLeft()) {
      const timeRemaining = timeLeft--;
      const normalizedTime = (60 - timeRemaining) / 60;
      // for clockwise animation
      // const normalizedTime = (timeRemaining - 60) / 60;
      timerCircle.style.strokeDashoffset = normalizedTime;
      timer.innerHTML = timeRemaining;
    } else {
      clearInterval(countdownTimer);
      timerElement.classList.remove("animatable");
    }
  }, 1000);
}

runTimer(document.querySelector(".timer"));

// let dataFromFetch = [];

async function fetchData() {
  const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy");
  const data = await response.json();
  console.log(data.results);
  return data.results;
}
let dataFromFetch = fetchData();

console.log("sono qui " + dataFromFetch);

// function getRandom(nQuestions) {
//   const numRandom = Math.floor(Math.random() * nQuestions);
//   return numRandom;
// }

// function printQuestion(nQuestions) {
//   const question = document.querySelector(".question > p");
//   const index = getRandom(arrayQuestions.length);
//   const myQuestion = arrayQuestions[index];
//   question.innerHTML = myQuestion.question;
//   arrayQuestions.splice(index, 1);
//   return myQuestion, printAnswers(myQuestion);
// }

// function printAnswers(objQuestion) {
//   const arrayAnswers = [];
//   const divAnswersConteiner = document.querySelector(".wrap-answers");

//   arrayAnswers.push(objQuestion.correct_answer);
//   objQuestion.incorrect_answers.forEach((el) => {
//     arrayAnswers.push(el);
//   });
//   arrayAnswers.sort();

//   for (const answr of arrayAnswers) {
//     const divAnswer = document.createElement("div");
//     divAnswer.classList.add("answer");
//     divAnswer.innerHTML = answr;
//     divAnswersConteiner.append(divAnswer);
//   }

//   selectAnswer(objQuestion);

//   // return console.log(objQuestion);
// }

// const selectAnswer = (obj) => {
//   const answers = document.querySelectorAll(".answer");
//   for (const answer of answers) {
//     answer.addEventListener("click", () => {
//       answers.forEach((a) => a.classList.remove("bg"));
//       answer.classList.add("bg");
//       console.log(answer.textContent);
//       const selectedAnswer = answer.textContent;

//       checkAnswer(selectedAnswer, obj);

//       // return selectedAnswer
//     });
//   }
// };

// let countCorrect = 0;
// let countIncorrect = 0;

// const checkAnswer = (answerToCheck, obj) => {
//   const correctAnswer = obj.correct_answer;
//   console.log(correctAnswer);
//   if (answerToCheck == correctAnswer) {
//     countCorrect += 1;
//   } else {
//     countIncorrect += 1;
//   }
// };

// const next = document.querySelector(".btn-next");
// next.addEventListener("click", () => {
//   // runTimer();
//   printQuestion();
// });

// printQuestion(arrayQuestions.length);
