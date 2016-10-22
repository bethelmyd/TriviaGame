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
	var count = 0;

	var intervalTimer = null;

	function displayImage (){
		$('#leftImage').html('<img src="assets/images/'+images[count]+ '" width="132px" height="132px">');
		$('#rightImage').html('<img src="assets/images/'+images[count]+ '" width="132px" height="132px">');
	}

	function nextImage (){
    //increment the count by 1
    count++;
    //if the count is the same as the length of the image array, reset the count to 0
    if(count == images.length)
    	count = 0;

    displayImage();

}

function startSlideshow (){
    //use a setInterval to run nextImage
    intervalTimer = setInterval(function(){
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
	//get question number
	var questionNum = questionsSelected.shift();
	//get question
	var question = questions[questionNum];  
	//put question into position on page
	$("p#question").html(question.question);
	$("div#choiceBlock ul#choices li#A").html(question.A);
	$("div#choiceBlock ul#choices li#B").html(question.B);
	$("div#choiceBlock ul#choices li#C").html(question.C);
	$("div#choiceBlock ul#choices li#D").html(question.D);
	$("div#answerBlock ul#answers li#A").html(question.A);
	$("span#answer").html(question[question.answer]);
}

function setUpHandlers(){
	
}

displayImage();
startSlideshow();
prepareQuestions();
displayQuestion();

}); //end ready