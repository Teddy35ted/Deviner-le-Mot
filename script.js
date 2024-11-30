// Liste des mots liés à la programmation
const words = [
    "python", "javascript", "java", "php", "html", "css", "react", "angular",
    "vue", "django", "flask", "laravel", "spring", "git", "github", "sql",
    "docker", "kubernetes", "typescript", "sass", "mongodb"
];

// Variables globales
let selectedWord = "";
let maskedWord = "";
let guessedLetters = [];
let attemptsLeft = 6;

// Sélection d'un mot aléatoire
function selectRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    maskedWord = "_".repeat(selectedWord.length);
    guessedLetters = [];
    attemptsLeft = 6;

    // Mise à jour de l'affichage
    updateGameDisplay();
    document.getElementById("continue-container").style.display = "none";
    document.getElementById("guess-form").style.display = "block";
}

// Mettre à jour l'affichage du jeu
function updateGameDisplay() {
    document.getElementById("masked-word").textContent = maskedWord.split("").join(" ");
    document.getElementById("attempts").textContent = attemptsLeft;
    document.getElementById("message").textContent = "";
}

// Fonction pour proposer une lettre
function submitGuess() {
    const letter = document.getElementById("letter").value.toLowerCase();
    const message = document.getElementById("message");
    document.getElementById("letter").value = ""; // Réinitialiser l'input

    // Validation de l'entrée
    if (!letter || guessedLetters.includes(letter)) {
        message.textContent = "Vous avez déjà essayé cette lettre ou elle est invalide.";
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        // Révéler les lettres trouvées
        let newMaskedWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            newMaskedWord += guessedLetters.includes(selectedWord[i])
                ? selectedWord[i]
                : "_";
        }
        maskedWord = newMaskedWord;
        updateGameDisplay();

        // Vérifier si l'utilisateur a gagné
        if (!maskedWord.includes("_")) {
            endGame(true); // L'utilisateur a gagné
        }
    } else {
        // Réduire les tentatives restantes
        attemptsLeft--;
        updateGameDisplay();

        // Vérifier si l'utilisateur a perdu
        if (attemptsLeft === 0) {
            endGame(false); // L'utilisateur a perdu
        } else {
            message.textContent = "Mauvaise lettre.";
        }
    }
}

// Fonction pour gérer la fin d'une manche
function endGame(didWin) {
    const message = document.getElementById("message");

    if (didWin) {
        message.textContent = "Félicitations ! Vous avez deviné le mot.";
    } else {
        message.textContent = `Dommage ! Le mot était : ${selectedWord}.`;
    }

    // Afficher le menu pour continuer
    document.getElementById("guess-form").style.display = "none";
    document.getElementById("continue-container").style.display = "block";
}

// Fonction pour continuer ou arrêter le jeu
function continueGame(choice) {
    if (choice === "yes") {
        selectRandomWord();
    } else {
        alert("Merci d'avoir joué ! À bientôt.");
        // Réinitialiser l'affichage pour terminer
        document.getElementById("masked-word").textContent = "";
        document.getElementById("message").textContent = "Jeu terminé.";
        document.getElementById("guess-form").style.display = "none";
        document.getElementById("continue-container").style.display = "none";
    }
}

// Initialisation du jeu
selectRandomWord();
