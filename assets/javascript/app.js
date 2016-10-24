"use strict";

$().ready(function(){

	var images = ["cocker_spaniel.jpg", "doberman.jpg", "pug.jpg", "maltese.jpg", "schnauzer.jpg", 
	"pekingese.jpg", "pit_bull.jpg", "rottweiler.jpg"];

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
	var quizTimer = null;
	var questionNumber = 0;
	var correct = false;
	var correctCount = 0;
	var $choice = null;
	var currentQuestionNum = null;

	function displayImage (){
		$('#leftImage').html('<img src="assets/images/'+images[imageCount]+ '" width="132px" height="132px">');
		$('#rightImage').html('<img src="assets/images/'+images[imageCount]+ '" width="132px" height="132px">');
	}

	function nextImage (){
    //increment the count by 1
    imageCount++;
    //if the count is the same as the length of the image array, reset the count to 0
    if(imageCount == images.length)
    	imageCount = 0;

    displayImage();

}

function startSlideshow (){
    //use a setInterval to run nextImage
    slideShowTimer = setInterval(function(){
    	nextImage();
    }, 4000);
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
	$("#choices li").each(function(){
		$(this).css("background-color", "white");
	});
	$("#answerArea").css("display", "none");
	$("#questionBlock").css("display", "block");
	//get question number
	currentQuestionNum = questionsSelected.shift();
	//get question
	var question = questions[currentQuestionNum];
	//put question into position on page
	$("p#question").html(question.question);
	$("div#choiceBlock ul#choices li#A").html(question.A);
	$("div#choiceBlock ul#choices li#B").html(question.B);
	$("div#choiceBlock ul#choices li#C").html(question.C);
	$("div#choiceBlock ul#choices li#D").html(question.D);
}

function displayAnswer(msg){
	$("#answerArea").css("display", "block");
	$("#answerArea span#answer").html(msg);
	var timer = setTimeout(function(){
		if(questionsSelected.length != 0)
		{
			if($choice != null)
				displayQuestion();
			else
			{
				$("#answerArea").css("display", "none");
				$("#answerArea span#answer").html("");	
			}

		}
		else
		{
			summarize();
		}
	}, 3000);
}

function gradeQuestion()
{
	if($choice == null)
	{
		displayAnswer("Please make a choice before submitting.");		
	}
	else
	{
		var answer = $choice.attr("id");
		var correctAnswer = questions[currentQuestionNum].answer;
		if(answer == correctAnswer)
		{
			correctCount++;
			displayAnswer("Great Job!");
		}
		else 
		{
			displayAnswer("The correct answer is: " + questions[currentQuestionNum][correctAnswer]);
		}
	}
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

function getChoice()
{
	$("#choices li").each(function(){
		$(this).css("background-color", "white");
	});
	$(this).css("background-color", "yellow");
	$choice = $(this);
	console.log($choice);
}

function setUpHandlers(){
	$("#startBtn").on("click", startQuiz);
	$("#submitBtn").on("click", gradeQuestion);
	$("#choices li").on("click", getChoice);
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
	$("#answerArea span#answer").html("");	
	$("#questionBlock").css("display", "none");
	$("#summaryArea").css("display", "none");
	questionNumber = 0;
	correct = false;
	$choice = null;
	currentQuestionNum = null;
	correctCount = 0;
}


/*Where everything starts*/
reset();
displayImage();
startSlideshow();
setUpHandlers();


}); //end ready