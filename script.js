const quizData = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: {
            a: "Bill Gates",
            b: "Elon Musk",
            c: "Steve Jobs",
            d: "Jeff Bezos"
        },
        correct: "b"
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: {
            a: "Earth",
            b: "Mars",
            c: "Jupiter",
            d: "Saturn"
        },
        correct: "c"
    }
];

let currentQuestionIndex = 0;
let numCorrect = 0;
let lives = 3;

function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    const currentQuestion = quizData[currentQuestionIndex];
    const answers = [];

    for (let letter in currentQuestion.answers) {
        answers.push(
            `<label>
                <input type="radio" name="question" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
        );
    }

    quizContainer.innerHTML = `<div class="question">${currentQuestion.question}</div>
                               <div class="answers">${answers.join('')}</div>
                               <button id="submit">Submit Answer</button>`;

    document.getElementById('submit').addEventListener('click', checkAnswer);
}

function checkAnswer() {
    const selector = `input[name=question]:checked`;
    const userAnswer = (document.querySelector(selector) || {}).value;

    if (userAnswer === quizData[currentQuestionIndex].correct) {
        numCorrect++;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            buildQuiz();
        } else {
            endQuiz();
        }
    } else {
        lives--;
        document.getElementById('lives').innerText = `Lives: ${lives}`;
        if (lives === 0) {
            endQuiz();
        }
    }
}

function endQuiz() {
    document.getElementById('quiz').classList.add('hidden');
    let resultMessage = `You answered ${numCorrect} out of ${quizData.length} questions correctly!`;
    if (lives === 0) {
        resultMessage += `<br>You have lost all your lives. Game over!`;
    }
    document.getElementById('results').innerHTML = resultMessage;
}

buildQuiz();
