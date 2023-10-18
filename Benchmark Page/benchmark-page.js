let timeLeft = 60;
let timer = document.getElementById('timeLeft');

function isTimeLeft() {
	return timeLeft > -1;
}

function runTimer(timerElement) {
	const timerCircle = timerElement.querySelector('svg > circle + circle');
	timerElement.classList.add('animatable');
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
			timerElement.classList.remove('animatable');
		}
	}, 1000);
}

runTimer(document.querySelector('.timer'));

fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy')
	.then(res => res.json())
	.then(el => {
		const arrayQuestions = el.results;

		function getRandom(nQuestions) {
			const numRandom = Math.floor(Math.random() * nQuestions);
			return numRandom;
		}

		function printQuestion(nQuestions) {
			const question = document.querySelector('.question > p');
			const myQuestion = arrayQuestions[getRandom(arrayQuestions.length)];
			question.innerHTML = myQuestion.question;
			return myQuestion, printAnswers(myQuestion);
		}

		function printAnswers(objQuestion) {
			const arrayAnswers = [];
			const divAnswersConteiner = document.querySelector('.wrap-answers');

			arrayAnswers.push(objQuestion.correct_answer);
			objQuestion.incorrect_answers.forEach(el => {
				arrayAnswers.push(el);
			});
			arrayAnswers.sort();

			for (const answr of arrayAnswers) {
				const divAnswer = document.createElement('div');
				divAnswer.classList.add('answer');
				divAnswer.innerHTML = answr;
				divAnswersConteiner.append(divAnswer);
			}

			const answers = document.querySelectorAll('.answer');

			for (const answer of answers) {
				answer.addEventListener('click', () => {
					console.log('hello');
					answer.classList.add('bg');
				});
				console.log(answer);
			}

			return console.log(arrayAnswers);
		}



		printQuestion(arrayQuestions.length);
	});
