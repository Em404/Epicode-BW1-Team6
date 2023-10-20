function cloneWelcomePage() {
  // Seleziona il modello
  const template = document.getElementsByTagName("template")[0].content;

  // Clona il contenuto del modello
  const clone = template.cloneNode(true);

  // Aggiungi il clone al contenitore desiderato
  const cloneContainer = document.getElementById("clone-Welcome-Page");
  cloneContainer.appendChild(clone);

  initCheckbox();
}

cloneWelcomePage();

function cloneBenchmarkPage() {
  const wrap = document.getElementById("wrap-WelcomePage");
  wrap.innerHTML = "";

  // Seleziona il modello
  const template = document.getElementsByTagName("template")[1].content;

  // Clona il contenuto del modello
  const clone = template.cloneNode(true);

  // Aggiungi il clone al contenitore desiderato
  const cloneContainer = document.getElementById("clone-Benchmark-Page");
  cloneContainer.appendChild(clone);

  initBenchmark();
}

let button = document.getElementById("btnWelcomePage");

function initCheckbox() {
  let checkbox = document.getElementById("check-welcome-page");

  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      button.removeAttribute("disabled");
    } else {
      button.disabled = "true";
    }
  });
}

button.addEventListener("click", function () {
  cloneBenchmarkPage();
});

function initBenchmark() {
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
        runTimer(timerElement);
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
      console.log("risposte corrette ", +countCorrect);
    } else {
      countIncorrect += 1;
      console.log("risposte sbagliate ", +countIncorrect);
    }
  };

  const getRemainQuestions = (arrayQuestions, oldQuestions) => {
    arrayQuestions.map((question) => {
      const index = arrayQuestions.indexOf(question);
      if (oldQuestions.find((q) => q.question == question.question)) {
        arrayQuestions.splice(index, 1);
      }
    });
    return arrayQuestions;
  };

  const removeOldAnswers = () => {
    const divAnswersConteiner = document.querySelector(".wrap-answers");
    divAnswersConteiner.innerHTML = null;
  };

  // const chagePage = () => {
  //   const btnChange = document.querySelector('#chagePage');
  //   btnChange.style.display = 'block';
  // }

  const numberOfQuestion = (questionIncrease) => {
    const numberOfQuestion = document.querySelector("#number-of-question");
    numberOfQuestion.innerHTML = `DOMANDA ${questionIncrease} / 10`;
  };

  fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
    .then((res) => res.json())
    .then((el) => {
      const arrayQuestions = el.results;
      const oldQuestions = [];
      let questionIncrease = 1;
      console.log(arrayQuestions);

      const myQuestion = printQuestion(arrayQuestions);
      oldQuestions.push(myQuestion);
      numberOfQuestion(questionIncrease);
      printAnswers(myQuestion);
      console.log(myQuestion);
      const next = document.querySelector(".btn-next");
      next.addEventListener("click", () => {
        if (arrayQuestions.length == 1) {
          next.classList.add("bg1");
          next.innerHTML = "INVIA";
        }
        if (arrayQuestions.length == 0) {
          cloneResultPage();
        }
        if (questionIncrease != 10) {
          questionIncrease++;
        }
        numberOfQuestion(questionIncrease);
        checkAnswer(selectedAnswer, myQuestion.correct_answer);
        // runTimer();
        const myNewQuestion = printQuestion(getRemainQuestions(arrayQuestions, oldQuestions));
        oldQuestions.push(myNewQuestion);
        console.log(arrayQuestions);
        console.log(oldQuestions);
        removeOldAnswers();
        printAnswers(myNewQuestion);

        resetCountdown();
      });
    });
}

function cloneResultPage() {
  const wrap = document.getElementById("wrap-Benchmark-Page");
  wrap.innerHTML = "";

  // Seleziona il modello
  const template = document.getElementsByTagName("template")[2].content;

  // Clona il contenuto del modello
  const clone = template.cloneNode(true);

  // Aggiungi il clone al contenitore desiderato
  const cloneContainer = document.getElementById("clone-Result-Page");
  cloneContainer.appendChild(clone);

  initResult();
}

function initResult() {
  let wrong2 = document.querySelector("#percentualeWrong");
  let correctTxt = document.querySelector("#percentualeCorrect");
  let txtNumber = correctTxt.textContent;
  let correctD = parseFloat(txtNumber);
  let correct2 = correctD.toFixed(2);

  let correct = correct2;

  let wrong = 100 - correct;

  let data = [wrong, correct2];

  let labels = ["Wrong", "correct2"];

  let colors = ["#D20094", "#00FFFF"];
  let borderColor = ["#D20094", "#00FFFF"];

  let ctx = document.getElementById("myDoughnutChart").getContext("2d");
  let myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: borderColor,
        },
      ],
    },
    options: {
      responsive: false,
      cutout: 120,
    },
  });
  wrong2.textContent = wrong.toFixed(1);

  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const btnRateUs = document.getElementById("buttonRateUs");
  btnRateUs.addEventListener("click", () => {
    cloneFeedbackPage();
  });
}

function cloneFeedbackPage() {
  const wrap = document.getElementById("wrap-Result-Page");
  wrap.innerHTML = "";

  // Seleziona il modello
  const template = document.getElementsByTagName("template")[3].content;

  // Clona il contenuto del modello
  const clone = template.cloneNode(true);

  // Aggiungi il clone al contenitore desiderato
  const cloneContainer = document.getElementById("clone-feedbackpage");
  cloneContainer.appendChild(clone);

  initFeedback();
}

function initFeedback() {
  let divStar = document.querySelectorAll("path");

  divStar.forEach((star, index) => {
    star.addEventListener("click", () => {
      divStar.forEach((star, index2) => {
        index >= index2 ? star.classList.add("pathAcceso") : star.classList.remove("pathAcceso");
      });
    });
  });
}
