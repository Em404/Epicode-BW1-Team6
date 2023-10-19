let timeLeft = 60;
let timer = document.getElementById("timeLeft");
let countdownTimer = 0;

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
      timerCircle.style.strokeDashoffset = normalizedTime;
      timer.innerHTML = timeRemaining;
    } else {
      clearInterval(countdownTimer);
      timerElement.classList.remove("animatable");
      triggerNextButton("btn-next");
      runTimer(timerElement)
    }
  }, 1000);
}


function resetCountdown() {
  clearInterval(countdownTimer);
  timeLeft = 60;
  const timerCircle = document.querySelector(".timer svg > circle + circle");
  timerCircle.style.strokeDashoffset = 1;
  timer.innerHTML = timeLeft;
  document.querySelector(".timer").classList.remove("animatable");
}


function triggerNextButton() {
  const button = document.querySelector(".btn-next");
  button.click();
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



let easy = document.querySelector('#choiceButtonEasy');
let medium = document.querySelector('#choiceButtonMedium');
let hard = document.querySelector('#choiceButtonHard');

let difficulty = 'easy'


// easy.addEventListener('click', function(){
//   difficulty = 'easy';
//   cloneBenchmarkPage();
// })
// medium.addEventListener('click', function(){
//   difficulty = 'medium';
//   cloneBenchmarkPage();

// })
// hard.addEventListener('click', function(){
//   difficulty = 'hard';
//   cloneBenchmarkPage();

// })


// function cloneBenchmarkPage(){
//   // Seleziona il modello
//   const template = document.getElementById("templateBanchmarkPage");
  
//   // Clona il contenuto del modello
//   const clone = document.importNode(template.content, true);
  
//   // Aggiungi il clone al contenitore desiderato
//   const cloneContainer = document.getElementById("cloneBanchmarkPage");
//   cloneContainer.appendChild(clone);
// }

function cloneChoicePage(){

  // Seleziona il modello
  const template = document.getElementById("templateChoicePage");
  
  // Clona il contenuto del modello
  const clone = document.importNode(template.content, true);
  
  // Aggiungi il clone al contenitore desiderato
  const cloneContainer = document.getElementById("cloneChoicePage");
  cloneContainer.appendChild(clone);
}

// cloneChoicePage()






fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`)
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
      
      const myNewQuestion = printQuestion(getRemainQuestions(arrayQuestions, oldQuestions));
      oldQuestions.push(myNewQuestion);
			removeOldAnswers();
      printAnswers(myNewQuestion);


      resetCountdown()
      
    });
  });
