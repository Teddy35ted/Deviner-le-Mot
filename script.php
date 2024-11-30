<?php
if (isset($_GET['username'])) {
    $username = htmlspecialchars($_GET['username']);
} else {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="play.css">
    <title>Deviner le Mot</title>
</head>
<body>

<nav class="navbar">
    <div class="container">
        <h1>Bienvenue, <?php echo $username; ?> !</h1>
    </div>
</nav>

<main class="game-container">
    <h2>Devinez le mot !</h2>
    <p id="masked-word">_ _ _ _ _</p>
    <p>Tentatives restantes : <span id="attempts">6</span></p>

    <!-- Formulaire pour proposer une lettre -->
    <form id="guess-form" onsubmit="return false;">
        <label for="letter">Entrez une lettre :</label>
        <input type="text" id="letter" maxlength="1" required>
        <button type="button" onclick="submitGuess()">Proposer</button>
    </form>

    <p id="message"></p>

    <!-- Menu pour continuer ou arrêter le jeu -->
    <div id="continue-container" style="display: none;">
        <p>Voulez-vous continuer avec un nouveau mot ?</p>
        <button onclick="continueGame('yes')" class="validate">Oui</button>
        <button onclick="continueGame('no')" class = "validate">Non</button>
    </div>

</main>

<script src="script.js"></script>
</body>
</html>
