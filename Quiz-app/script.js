const questions = [{
    title: "who is the best club in the world?",
    id: 1233,
    choices: ["Manchester city", "Real Madrid", "Manchester United", "Barcelona"]
}, {
    title: "What is the feature of CS in the age of AI?",
    id: 1234,
    choices: ["We are fucked", "No worries", "Hoping for the best", "Nothing" +
    " will happen"]
}, {
    title: "What is the best programming language?",
    id: 1235,
    choices: ["JavaScript", "Java", "C", "C++"]
}, {
    title: "What is the greatest country in the world?",
    id: 1236,
    choices: ["Ethiopia", "USA", "Somalia LOL ", "Germany"]
}, {
    title: "Is BJJ the best Martial Art ",
    id: 1237,
    choices: ["Hell no ", "Fuck no", "Maybe", "100%"]
}
]

const correctAnswers = [
    "Manchester United",
    "We are fucked",
    "Java",
    "Ethiopia",
    "100%"];
const quizWelcomeDisplay = document.querySelector(".quiz-container__questions")
const span = document.querySelector("span");
const par = document.querySelector("p");
const displayChoices = document.querySelector(".quiz-container__choices");
const displayResults = document.querySelector(".quiz-container__result");
const preBtn = document.querySelector(".previousBtn");
const nextBtn = document.querySelector(".nextBtn");
const progressBar = document.querySelector(".progress-bar p");
let quizCounterIndex = 0;
let userAnswers = []

function welcomePage() {
    quizWelcomeDisplay.textContent = 'Welcome to the Quiz!, please press START' +
        ' button to begin';
}


function displayUI() {
    let currentQuiz = questions[quizCounterIndex];

    span.textContent = `${quizCounterIndex + 1}`;
    par.textContent = currentQuiz.title;
    displayChoices.innerHTML = ``;
    //loop through each choice
    currentQuiz.choices.forEach((choice, index) => {
        let uniqueId = `${currentQuiz.id}--${index}`;
        //check if it is already been selected when we go backwards;
        let isChecked = userAnswers[quizCounterIndex] === choice ? 'checked' : '';
        let innerString = `
        <div class="quiz">
            <input type="radio" id="${uniqueId}" value="${choice}" name="${currentQuiz}" ${isChecked}/>
            <label for ="${uniqueId}">${choice}</label>
        </div>`;
        displayChoices.innerHTML += innerString;
    });

    progressUpdater();
    nextBtn.disabled = quizCounterIndex >= questions.length - 1;
    nextBtn.classList.toggle("active", !nextBtn.disabled);
    preBtn.disabled = quizCounterIndex === 0;
    preBtn.classList.toggle("active", !preBtn.disabled);

    displayResults.innerHTML = ``
    if (nextBtn.disabled) {
        const div = document.createElement("div");
        div.classList.add("displayResult-button");
        const finishBtn = document.createElement("button");
        finishBtn.classList.add("finish,active");
        finishBtn.textContent = "Done";
        div.appendChild(finishBtn);
        displayResults.appendChild(div);
        finishBtn.addEventListener("click", calculateResult);
    }
}

function goNext() {
    if (quizCounterIndex < questions.length - 1) {
        quizCounterIndex++;
        displayUI();
    }
}

function goBack() {
    if (quizCounterIndex > 0) {
        quizCounterIndex--;
        displayUI();
    }
}

function progressUpdater() {
    let answers = Object.keys(userAnswers).length;
    let progressWidth = (answers / questions.length) * 100;
    progressBar.style.width = progressWidth + '%';
}

displayChoices.addEventListener("change", (e) => {
    if (e.target.type === 'radio') {
        userAnswers[quizCounterIndex] = e.target.value;
    }
    progressUpdater();
});

nextBtn.addEventListener("click", goNext);
preBtn.addEventListener("click", goBack);
/*welcomePage();*/
displayUI();

function calculateResult() {
    let grade = 0;
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            grade++;
        }
    }
    const par = document.createElement("p");
    par.innerHTML = `
      <strong>${grade}</strong>
        <em>out of</em> 
      <strong>${correctAnswers.length}</strong>
`;
    displayResults.appendChild(par);
}

