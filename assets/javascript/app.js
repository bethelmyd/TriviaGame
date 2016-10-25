"use strict";

$().ready(function(){

	var imagesForSlideShow = ["cocker_spaniel.jpg", "doberman.jpg", "pug.jpg", "maltese.jpg", "schnauzer.jpg", 
	"pekingese.jpg", "pit_bull.jpg", "rottweiler.jpg"];

	var imagesForCorrectAnswer = ["celebdog1.jpg", "celebdog2.jpg", "celebdog3.jpg", "celebdog4.jpg"];
	var imagesForIncorrectAnswer = ["saddog1.jpg", "saddog2.jpg", "saddog3.jpg", "saddog4.jpg"];

	var questions = [
	{
		question: "Normal adult dogs have how many teeth?",
		"A": 24, "B": 38, "C": 42, "D": 32,
		answer: "C"
	},
	{
		question: "Through what part of the body do dogs sweat?",
		"A": "Mouth", "B": "Ears", "C": "Nose" , "D": "Paws",
		answer: "D"
	}
	];

	var questionsSelected = [];

	var secondsToWait = 5;
	var imageCount = 0;

	var slideShowTimer = null;
	var questionTimer = null;
	var questionNumber = 0;
	var correct = false;
	var correctCount = 0;
	var $choice = null;
	var currentQuestionNum = null;

	function displaySlideImage (){
		$('#leftImage').html('<img src="assets/images/'+imagesForSlideShow[imageCount]+ '" width="132px" height="132px">');
		$('#rightImage').html('<img src="assets/images/'+imagesForSlideShow[imageCount]+ '" width="132px" height="132px">');
	}

	function nextImage (){
    //increment the count by 1
    imageCount++;
    //if the count is the same as the length of the image array, reset the count to 0
    if(imageCount == imagesForSlideShow.length)
    	imageCount = 0;

    displaySlideImage();

}

function startSlideshow (){
    //use a setInterval to run nextImage
    slideShowTimer = setInterval(function(){
    	nextImage();
    }, 2000);
}

function prepareQuestions()  //sets up a random selection of question numbers
{
	var count = 0;
	do{
		var random = Math.floor(Math.random() * questions.length);
		if(questionsSelected.indexOf(random) < 0)
		{
			count++;
			questionsSelected.push(random);
		}
	}while (count < questions.length);

}

function displayQuestion()
{	
	$("#choices li").hover(function(){
		$(this).css("background-color", "yellow");
	}, function(){
		$(this).css("background-color", "white");		
	});

	$("#answerArea").css("display", "none");
	$("#questionBlock").css("display", "block");
	currentQuestionNum = questionsSelected.shift();
	//get question
	var question = questions[currentQuestionNum];
	//put question into position on page
	$("p#question").html(question.question);
	$("div#choiceBlock ul#choices li#A").html(question.A);
	$("div#choiceBlock ul#choices li#B").html(question.B);
	$("div#choiceBlock ul#choices li#C").html(question.C);
	$("div#choiceBlock ul#choices li#D").html(question.D);

	$("#clock").css("display", "block");
	secondsToWait = 5;
	$("#timeLeft").html(secondsToWait);
	questionTimer = setInterval(function(){
		secondsToWait--;
		if(secondsToWait == 0)
		{
			clearInterval(questionTimer);
			var correctAnswer = questions[currentQuestionNum].answer;
			displayAnswer("Times Up!<br>The correct answer is: " + questions[currentQuestionNum][correctAnswer], false);
			var timer = setTimeout(function(){
				$("#answerArea").css("display", "none");
				$("#answerArea #answer").html("");					
				if(questionsSelected.length != 0)
				{
					displayQuestion();
				}
				else
				{
					summarize();
				}
			}, 2000);
		}
		$("#timeLeft").html(secondsToWait);
	}, 1000);


}

function displayAnswer(msg, isCorrect){
	$("#questionBlock").css("display", "none");
	$("#answerArea").css("display", "block");
	$("#answer").html(msg);
	var random = Math.floor(Math.random() * imagesForCorrectAnswer.length);
	var img;
	if(isCorrect)
	{
		img = imagesForCorrectAnswer[random];
	}
	else
	{
		img = imagesForIncorrectAnswer[random];		
	}
	$("#answerImage").html("<img src = 'assets/images/" + img + "'>");
}

function gradeQuestion()
{
	clearInterval(questionTimer);

	var answer = $(this).attr("id");
	var correctAnswer = questions[currentQuestionNum].answer;
	console.log(answer + " " + correctAnswer);
	if(answer == correctAnswer)
	{
		correctCount++;
		displayAnswer("Great Job!", true);
	}
	else 
	{
		displayAnswer("Sorry!<br>The correct answer is: " + questions[currentQuestionNum][correctAnswer], false);
	}
	var timer = setTimeout(function(){
		$("#answerArea").css("display", "none");
		$("#answerArea #answer").html("");	
		if(questionsSelected.length != 0)
		{
			displayQuestion();
		}
		else
		{
			summarize();
		}
	}, 2000);
}

function summarize()
{
	$("#answerArea").css("display", "none");
	$("#questionBlock").css("display", "none");
	$("#summaryArea").css("display", "block");
	$("#numQuestions").html("Number of questions: " + questions.length);
	$("#numCorrect").html("Number of correct answers: " + correctCount);
	$("#numWrong").html("Number of incorrect answers: " + (questions.length - correctCount));
}

function startQuiz()
{
	$("#startBtn").css("display", "none");
	$("#splashScreen").css("display", "none");
	prepareQuestions();
	displayQuestion();
}

function setUpHandlers(){
	$("#startBtn").on("click", startQuiz);
	$("#choices li").on("click", gradeQuestion);
	$("#restartBtn").on("click", restart);

}

function restart()
{
	reset();
	prepareQuestions();
	displayQuestion();
}

function reset(){
	$("#answerArea").css("display", "none");
	$("#answerArea #answer").html("");	
	$("#questionBlock").css("display", "none");
	$("#summaryArea").css("display", "none");
	questionNumber = 0;
	correct = false;
	currentQuestionNum = null;
	correctCount = 0;
}


/*Where everything starts*/
reset();
displaySlideImage();
startSlideshow();
setUpHandlers();


}); //end ready