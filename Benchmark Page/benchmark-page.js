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

function getRandom(nQuestions) {
  const numRandom = Math.floor(Math.random() * nQuestions);
  return numRandom;
}

function printQuestion(arrayQuestions) {
  const question = document.querySelector(".question > p");
  const index = getRandom(arrayQuestions.length);
  const myQuestion = arrayQuestions[index];
  question.innerHTML = myQuestion.question;

  return myQuestion;
}

let selectedAnswer = "";

function printAnswers(objQuestion) {
  const arrayAnswers = [];
  const divAnswersConteiner = document.querySelector(".wrap-answers");

  arrayAnswers.push(objQuestion.correct_answer);
  objQuestion.incorrect_answers.forEach((el) => {
    arrayAnswers.push(el);
  });
  arrayAnswers.sort();

  for (const answr of arrayAnswers) {
    const divAnswer = document.createElement("div");
    divAnswer.classList.add("answer");

    divAnswer.addEventListener("click", () => {
      document.querySelectorAll(".answer").forEach((a) => a.classList.remove("bg"));
      divAnswer.classList.add("bg");
      console.log(divAnswer.textContent);
      selectedAnswer = divAnswer.textContent;
    });

    divAnswer.innerHTML = answr;
    divAnswersConteiner.append(divAnswer);
  }

}

let countCorrect = 0;
let countIncorrect = 0;

const checkAnswer = (answerToCheck, correctAnswer) => {
  console.log(correctAnswer);
  if (answerToCheck == correctAnswer) {
    countCorrect += 1;
		console.log('risposte corrette ', + countCorrect);
  } else {
    countIncorrect += 1;
		console.log('risposte sbagliate ', + countIncorrect);
  }
};

const getRemainQuestions = (arrayQuestions, oldQuestions) => {
  const newArrayQuestions = [...arrayQuestions];
  arrayQuestions.map((question) => {
    const index = arrayQuestions.indexOf(question);
    if (oldQuestions.find((q) => q.question == question.question)) {
      newArrayQuestions.splice(index, 1);
    }
  });
  return newArrayQuestions;
};

const removeOldAnswers = () => {
	const divAnswersConteiner = document.querySelector(".wrap-answers");
	divAnswersConteiner.innerHTML = null
}

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
  .then((res) => res.json())
  .then((el) => {
    const arrayQuestions = el.results;
    const oldQuestions = [];
    console.log(arrayQuestions);

    const myQuestion = printQuestion(arrayQuestions);
    oldQuestions.push(myQuestion);
    printAnswers(myQuestion);
    console.log(myQuestion);
    const next = document.querySelector(".btn-next");
    next.addEventListener("click", () => {
      checkAnswer(selectedAnswer, myQuestion.correct_answer);
      // runTimer();
      const myNewQuestion = printQuestion(getRemainQuestions(arrayQuestions, oldQuestions));
      oldQuestions.push(myNewQuestion);
			removeOldAnswers();
      printAnswers(myNewQuestion);
    });
  });
