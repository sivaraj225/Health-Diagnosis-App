const questions = [
    {
        question: "How often do you feel anxious or worried about different aspects of your life?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        weight: [0, 1, 2, 3, 4]
    },
    {
        question: "In the past week, how often have you felt sad or down?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        weight: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you find it difficult to concentrate on tasks or make decisions?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        weight: [0, 1, 2, 3, 4]
    },
    // Add more questions here as needed
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptions = [];

function loadQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[index];
    
    questionContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        <div class="answer-group">
            ${questionData.options.map((option, i) => `
                <label>
                    <input type="radio" name="answer" value="${i}" ${selectedOptions[index] === i ? 'checked' : ''}>
                    ${option}
                </label><br/>
            `).join('')}
        </div>
    `;

    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').innerText = (index === questions.length - 1) ? 'Submit' : 'Next';
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        selectedOptions[currentQuestionIndex] = parseInt(selectedOption.value);
        score += questions[currentQuestionIndex].weight[selectedOptions[currentQuestionIndex]];

        if (currentQuestionIndex === questions.length - 1) {
            showResults();
            return;
        }

        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        alert('Please select an answer.');
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function showResults() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div class="question">Your total mental health score is: ${score}</div>
        <div class="answer-group">
            <p>0-10: You are in great mental health!</p>
            <p>11-20: Moderate mental health challenges.</p>
            <p>21 and above: High risk of mental health issues, consider seeking help.</p>
        </div>
    `;
    document.querySelector('.navigation').style.display = 'none';
}

window.onload = function() {
    loadQuestion(currentQuestionIndex);
};
