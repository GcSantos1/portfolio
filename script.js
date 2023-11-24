const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const container = document.querySelector(".container");
const mainNone = document.querySelector(".mainNone");

import questions from "./questions.js";

let currentIndex= 0;
let questionsCorrect =0;

btnRestart.onclick = () => {
    container.style.display = "flex";
    content.style.display = "flex";
    contentFinish.style.display = "none";
    mainNone.style.display = "flex";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();

};

function nextQuestion(e) {
    const respostaSelecionada = e.target;
    const respostaCorreta = respostaSelecionada.getAttribute("data-correct") === "true";
    

    if (respostaCorreta) {
        questionsCorrect++;
    }

    document.querySelectorAll(".answer").forEach(item => {
        item.removeEventListener("click", nextQuestion);
        item.style.pointerEvents = "none";
    });

    const feedback = document.createElement("div");
    feedback.innerHTML = respostaCorreta ? "Resposta Correta!" : "Resposta Incorreta";
    feedback.style.color = respostaCorreta ? "green" : "red";
    respostaSelecionada.appendChild(feedback);

    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion();
        } else {
            finish();
        }
    }, 1200);
    function finish(){
        textFinish.innerHTML = `Você acertou ${questionsCorrect} de  ${questions.length}`;
        content.style.display = "none";
        contentFinish.style.display = "flex";
        mainNone.style.display = "none";
        }
    
        
}


function loadQuestion(){
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class= "answer" data-correct="${answer.correct}">
        ${answer.option}
        </button>
        `;

        answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
    
}

loadQuestion();
