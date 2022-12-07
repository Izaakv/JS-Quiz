var startDiv = document.getElementById("start-div");
var quizDiv = document.getElementById("questions-div");
var resultsDiv = document.getElementById("results-div");
var gameOverDiv = document.getElementById("game-over-form");
var highscoreDiv = document.getElementById("highscore-div");

var viewHighscores = document.getElementById("highscore");
var timer = document.getElementById("timer");

var secondsLeft = 30;
var questionIndex = 0;
var endScore;
var initials;
var answerindex;
var highscoreArr = [];
var timerInterval;

var questionsAndAnswers = [
  {
    question: "What does css mean?",
    answers: ["1. Cascasding Style Sheet", "2. Can't style sheet", "3. Can't stand styling", "4. Cat stay styling"],
    correctAnswer: "1. Cascading Style Sheet",
  },
  {
    question:
      "What do you wrap a function in",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "3. parentheses",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: "3. quotes",
  },
  {
    question:
      "Who has the best bootcamp?",
    answers: [
      "1. ASU",
      "2. Stanford",
      "3. UofA",
      "4. MCC",
    ],
    correctAnswer: "3. UofA",
  },
];

startPage();

function startPage() {
  timer.textContent = "Timer: 0";
  var startHeader = document.createElement("h1");
  startHeader.textContent = "Coding Quiz Challenge";
  startDiv.appendChild(startHeader);
  var gameIntro = document.createElement("p");
  gameIntro.textContent =
    "You'll have 30 seconds to answer random questions. If a question is answered incorrectly, you'll lose 5 seconds. Good Luck";
  startDiv.appendChild(gameIntro);
  var startButton = document.createElement("button");
  startButton.setAttribute("class", "btn");
  startButton.textContent = "Start Quiz";
  startDiv.appendChild(startButton);

  startButton.addEventListener("click", function () {
    startTimer();
    renderQuestions();
  });
  viewHighscores.addEventListener("click", function () {
    gotoHighscores();
  });
}

function startTimer() {
  var timerInterval = setInterval(function () {
    timer.textContent = "Timer: " + secondsLeft;
    secondsLeft--;
    if (secondsLeft < 0 || questionIndex === questionsAndAnswers.length) {
      clearInterval(timerInterval);
      setTimeout(gameOver, 1000);
    }
  }, 1000);
}

function renderQuestions() {
  startDiv.innerHTML = "";
  resultsDiv.innerHTML = "";

  if (questionIndex === questionsAndAnswers.length) {
    return;
  }
  var questionHeader = document.createElement("h2");
  questionHeader.textContent = questionsAndAnswers[questionIndex].question;
  quizDiv.appendChild(questionHeader);
  var optionList = document.createElement("ul");
  optionList.setAttribute("class", "col-lg-12");
  for (
    var answerindex = 0;
    answerindex < questionsAndAnswers[questionIndex].answers.length;
    answerindex++
  ) {
    var answerListEl = document.createElement("li");
    var answerButton = document.createElement("button");
    answerButton.setAttribute("class", "btn");
    answerButton.textContent =
      questionsAndAnswers[questionIndex].answers[answerindex];
    answerListEl.appendChild(answerButton);
    optionList.appendChild(answerListEl);
  }
  quizDiv.appendChild(optionList);
  quizDiv.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    if (event.target.matches("button")) {
      if (
        event.target.textContent ==
        questionsAndAnswers[questionIndex].correctAnswer
      ) {
        quizDiv.innerHTML = "";
        var results = document.createElement("img");
        results.setAttribute("correct");
        resultsDiv.appendChild(results);
        questionIndex++;
        setTimeout(renderQuestions, 1000);
      }
      else {
        secondsLeft = secondsLeft - 5;
        quizDiv.innerHTML = "";
        var results = document.createElement("wrong")
        resultsDiv.appendChild(results);
        questionIndex++;
        setTimeout(renderQuestions, 1000);
      }
    }
  });
}

function gameOver() {
  quizDiv.innerHTML = "";
  resultsDiv.innerHTML = "";
  var endGameHeader = document.createElement("h2");
  endGameHeader.textContent = "All done!";
  gameOverDiv.appendChild(endGameHeader);
  var endScore = secondsLeft + 1;
  var endScoreEl = document.createElement("p");
  endScoreEl.setAttribute("class", "col-lg-12");
  endScoreEl.textContent = "Your final score is " + endScore + "!";
  gameOverDiv.appendChild(endScoreEl);

  var highscoreForm = document.createElement("form");

  var formLabel = document.createElement("label");
  formLabel.setAttribute("class", "form-group mb-2");
  formLabel.textContent = "Enter Initials";
  highscoreForm.appendChild(formLabel);

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "form-control mr-2 ml-2 mb-2");
  highscoreForm.appendChild(input);

  var submitButton = document.createElement("button");
  submitButton.setAttribute("class", "btn");
  submitButton.textContent = "Submit";
  highscoreForm.appendChild(submitButton);
  gameOverDiv.appendChild(highscoreForm);


  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();


    var initialsEntered = input.value;

    if (JSON.parse(localStorage.getItem("highscores")) == null) {
      highscoreArr.push({ initials: initialsEntered, score: endScore });
      localStorage.setItem("highscores", JSON.stringify(highscoreArr));
    }

    else if (highscoreArr.length > 0) {
      highscoreArr.push({ initials: initialsEntered, score: endScore });
      localStorage.setItem("highscores", JSON.stringify(highscoreArr));
    }

    else {
      var highscoreStorage = JSON.parse(localStorage.getItem("highscores"));
      for (var i = 0; i < highscoreStorage.length; i++) {
        highscoreArr.push(highscoreStorage[i]);
      }
      highscoreArr.push({ initials: initialsEntered, score: endScore });
      localStorage.setItem("highscores", JSON.stringify(highscoreArr));
    }
    gotoHighscores();
  });
}


function gotoHighscores() {

  startDiv.innerHTML = "";

  gameOverDiv.innerHTML = "";

  highscoreDiv.innerHTML = "";

  var highscoreHeader = document.createElement("h2");
  highscoreHeader.setAttribute("class", "col-lg-12");
  highscoreHeader.textContent = "Highscores!";
  highscoreDiv.appendChild(highscoreHeader);

  var highscoreTable = document.createElement("table");
  highscoreTable.setAttribute("class", "table col-lg-12");

  var tableHeaderRow = document.createElement("tr");
  var tableInitialsHeader = document.createElement("th");
  var tableScoreHeader = document.createElement("th");
  tableInitialsHeader.textContent = "Initials";
  tableScoreHeader.textContent = "Score";
  tableHeaderRow.appendChild(tableInitialsHeader);
  tableHeaderRow.appendChild(tableScoreHeader);
  highscoreTable.appendChild(tableHeaderRow);

 
  for (
    var highscoreIndex = 0;
    highscoreIndex < highscoreArr.length;
    highscoreIndex++
  ) {
 
    var highscoreRow = document.createElement("tr");
    var tableInitials = document.createElement("td");
    var tableScores = document.createElement("td");
    var storageScores = JSON.parse(localStorage.getItem("highscores"));
    tableInitials.textContent = storageScores[highscoreIndex].initials;
    tableScores.textContent = storageScores[highscoreIndex].score;
    highscoreRow.appendChild(tableInitials);
    highscoreRow.appendChild(tableScores);
    highscoreTable.appendChild(highscoreRow);
  }

  highscoreDiv.appendChild(highscoreTable);

  var buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "col-lg-12");
  var backBtn = document.createElement("button");
  backBtn.setAttribute("class", "mr-2 btn");
  backBtn.textContent = "Go Back";
  buttonDiv.appendChild(backBtn);
  var clearBtn = document.createElement("button");
  clearBtn.setAttribute("class", "btn");
  clearBtn.textContent = "Clear Highscores";
  buttonDiv.appendChild(clearBtn);
  highscoreDiv.appendChild(buttonDiv);

  backBtn.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    highscoreDiv.innerHTML = "";
    questionIndex = 0;
    secondsLeft = 75;
    startPage();
  });

  clearBtn.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    highscoreArr = [];
    localStorage.clear();
    highscoreDiv.innerHTML = "";
    return gotoHighscores();
  });
}