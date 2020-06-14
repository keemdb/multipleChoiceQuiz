const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const gImg = document.getElementById("gImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDIV = document.getElementById("scoreContainer");

let questions = [
	{
		question : "What does HTML stand for?",
		imgSrc : "img/html.png",
		choiceA : "Correct",
		choiceB : "Wrong",
		choiceC : "Wrong",
		correct : "A"
	},
	{
		question : "What does CSS stand for?",
		imgSrc : "img/css.png",
		choiceA : "Wrong",
		choiceB : "Correct",
		choiceC : "Wrong",
		correct : "B"
	},
	{
		question : "What does JS stand for?",
		imgSrc : "img/js.png",
		choiceA : "Wrong",
		choiceB : "Wrong",
		choiceC : "Correct",
		correct : "C"
	}
];

// create some variables

const lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 0;
let score = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;

// render a question

function renderQuestion(){
	let q = questions[runningQuestion];

	question.innerHTML = "<p>"+ q.question +"</p>";
	qImg.innerHTML = "<img src="+ q.imgSrc +">";
	choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
}

start.addEventListener('click', startQuiz);

function startQuiz(){
	start.style.display = "none";
	renderQuestion();
	quiz.style.display = "block";
	renderProgress();
	renderCounter();
	TIMER = setInterval(renderCounter, 1000);	
}


//render progress

function renderProgress(){
	for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
		progress.innerHTML += "<div class='prog' id="+qIndex+"></div>";
	}
}


function renderCounter(){
	if(count <= questionTime){
		counter.innerHTML = count;
		timeGauge.style.width = count * gaugeUnit + "px";
		count++;
	}else{
		count = 0;
		answerIsWrong();
		if(runningQuestion < lastQuestion) {
			runningQuestion++;
			renderQuestion();
		}else{
			//퀴즈종료후 점수
			clearInterval(TIMER);
			scoreRender();
		}
	}

}

//chechAnswer

function checkAnswer(answer){
	if(answer == questions[runningQuestion].correct){
		//정답일때
		score ++;
		answerIsCorrect();

	}else{
		//오답일때
		answerIsWrong();

	}
	count = 0;
	if(runningQuestion < lastQuestion) {
		runningQuestion++;
		renderQuestion();
	}else{
		//퀴즈종료후 점수
		clearInterval(TIMER);
		scoreRender();
	}
}

//정답일때
function answerIsCorrect(){
	document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
//오답일때
function answerIsWrong(){
	document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
	scoreDIV.style.display = "block";

	// calculate the amount of question percent answered by the user
	const scorePerCent = Math.round( 100 *  score / questions.length);

	// choose the image based on the scorePerCent

	let img = (scorePerCent >= 80) ? "img/5.png" :
			  (scorePerCent >= 60) ? "img/4.png" :
			  (scorePerCent >= 30) ? "img/3.png" :
			  (scorePerCent >= 20) ? "img/2.png" :
			  "img/1.png";

	scoreDIV.innerHTML = "<img src="+img+">";
	scoreDIV.innerHTML += "<p>"+ scorePerCent +"%</p>";
}