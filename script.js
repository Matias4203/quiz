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

function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    const currentQuestion = quizData[currentQuestionIndex];
    const answers = [];

    for (letter in currentQuestion.answers) {
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

    document.getElementById('submit').addEventListener('click', showResults);
}

function showResults() {
    const answerContainers = document.querySelectorAll('.answers');
    const selector = `input[name=question]:checked`;
    const userAnswer = (document.querySelector(selector) || {}).value;

    if (userAnswer === quizData[currentQuestionIndex].correct) {
        numCorrect++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        buildQuiz();
    } else {
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('results').innerHTML = `You answered ${numCorrect} out of ${quizData.length} questions correctly!`;
    }
}

buildQuiz();
