document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "Berlin", "London", "Rome"],
            correctAnswer: "Paris"
        },
        {
            question: "What is the capital of the United States of America?",
            options: ["Paris", "Berlin", "London", "Washington DC"],
            correctAnswer: "Washington DC"
        }
        
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionTextElement = document.getElementById("question-text");
    const optionButtons = document.querySelectorAll(".option");
    const nextButton = document.querySelector(".next-button");
    const scoreTracker = document.getElementById("score-tracker");
    const loadingPlaceholder = document.getElementById("loading-placeholder");
    const optionsContainer = document.querySelector(".options-container");

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;

        // Set the text for each option button
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].textContent = currentQuestion.options[i];
            optionButtons[i].disabled = false;
            optionButtons[i].style.backgroundColor = ""; 
        }

        // Update score display
        scoreTracker.textContent = `Score: ${score}/${questions.length}`;
    }

    function handleOptionClick(selectedButton) {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        // Disable all buttons after selecting an answer
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].disabled = true;
        }

        // Check if the selected answer is correct
        if (selectedButton.textContent === correctAnswer) {
            selectedButton.style.backgroundColor = "lightgreen";
            score++;
        } else {
            selectedButton.style.backgroundColor = "lightcoral";
        }

        // Update score display
        scoreTracker.textContent = `Score: ${score}/${questions.length}`;
    }

    // Add event listeners to each option button
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].addEventListener("click", () => {
            handleOptionClick(optionButtons[i]);
        });
    }

    // Handle next button click
    nextButton.addEventListener("click", () => {
        // Show loading placeholder and hide elements
        loadingPlaceholder.style.display = "block";
        questionTextElement.style.display = "none";
        optionsContainer.style.display = "none";

        setTimeout(() => {
            // Hide loading placeholder and show elements again
            loadingPlaceholder.style.display = "none";
            questionTextElement.style.display = "block";
            optionsContainer.style.display = "flex";

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                // If no more questions, end the quiz
                questionTextElement.textContent = "Quiz Completed!";
                nextButton.style.display = "none";
            }
        }, 500);
    });

    // Display the first question on load
    displayQuestion();
});
