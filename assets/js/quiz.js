const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// The questions of the quiz
let questions = [
    {
        question: 'Who is the all-time Premier League top scorer?',
        choice1: 'Wayne Rooney',
        choice2: 'Alan Shearer',
        choice3: 'Mohamed Salah',
        choice4: 'Harry Kane',
        answer: 2,
        imagesrc: 'assets/images/wayne-rooney.jpeg',
    },
    {
        question: 'Which team has won the most Premier League titles?',
        choice1: 'Chelsea',
        choice2: 'Arsenal',
        choice3: 'Manchester United',
        choice4: 'Manchester City',
        answer: 3,
        imagesrc: 'assets/images/clubs.jpeg',
    },
    {
        question: 'Who has the most assists in Premier League history?',
        choice1: 'Ryan Giggs',
        choice2: 'Steven Gerrard',
        choice3: 'Thierry Henry',
        choice4: 'Trent Alexander-Arnold',
        answer: 1,
        imagesrc: 'assets/images/steven-gerrard.jpeg',
    },
    {
        question: 'How many clubs have won the Premier League title?',
        choice1: '5',
        choice2: '6',
        choice3: '7',
        choice4: '8',
        answer: 3,
        imagesrc: 'assets/images/leicester-city.jpeg',
    },
    {
        question: 'What is the record points total in a Premier League season?',
        choice1: '98',
        choice2: '100',
        choice3: '106',
        choice4: '114',
        answer: 2,
        imagesrc: 'assets/images/record-points-total.jpg',
    },
    {
        question: 'Which player has the most Premier League appearances?',
        choice1: 'Mark Noble',
        choice2: 'James Milner',
        choice3: 'David James',
        choice4: 'Gareth Barry',
        answer: 4,
        imagesrc: 'assets/images/gareth-barry.jpg',
    },
    {
        question: 'In what year did the Premier League begin?',
        choice1: '1990',
        choice2: '1992',
        choice3: '1995',
        choice4: '1996',
        answer: 2,
        imagesrc: 'assets/images/first-season.jpg',
    },
    {
        question: 'Who has played for the most Premier League clubs?',
        choice1: 'Nicolas Anelka',
        choice2: 'Craig Bellamy',
        choice3: 'Marcus Bent',
        choice4: 'Andy Cole',
        answer: 3,
        imagesrc: 'assets/images/nicolas-anelka.jpg',
    },
    {
        question: 'Who has not won the Premier League with two different clubs?',
        choice1: 'Frank Lmapard',
        choice2: 'Robert Huth',
        choice3: 'Henning Berg',
        choice4: 'Ashley Cole',
        answer: 1,
        imagesrc: 'assets/images/frank-lampard-john-terry.jpg',
    },
    {
        question: 'Who scored the first goal in the Premier League era?',
        choice1: 'Brian Deane',
        choice2: 'Gordon Strachan',
        choice3: 'Les Ferdinand',
        choice4: 'Steve Bruce',
        answer: 1,
        imagesrc: 'assets/images/gordon-strachan.jpg',
    },
];


const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

// Function to start the Quiz
startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

// Function to display the next question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    //Updates the progress bar and text
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    // Generates a random order for the questions
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    
    //Displays an image for the current question
    document.getElementById("image").src = currentQuestion.imagesrc;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

// Function to allow a choice to be made by the player
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number'];

       let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

       // Increments score if choice is correct
       if(classToApply === 'correct') {
           incrementScore(SCORE_POINTS);
       }

       selectedChoice.parentElement.classList.add(classToApply);

       /* Changes colour of choice for 1 second to green
       if correct and red if wrong */ 
       setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply);
           getNewQuestion();

       }, 1000);
    });
});

//Updates Score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

//Runs the quiz
startQuiz();
