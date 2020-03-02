var score, roundtScore, activPlayer, gamePlaying;

init();
var lastRoll;

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {

        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;


        var diceDOM = document.querySelector("#dice-1")
        diceDOM.style.display = "block"
        diceDOM.src = "dice-" + dice + ".png"

        var dice1DOM = document.querySelector("#dice-2")
        dice1DOM.style.display = "block"
        dice1DOM.src = "dice-" + dice1 + ".png"



        if (dice === 6 && lastRoll === 6) {
            score[activPlayer] = 0
            document.querySelector("#score-" + activPlayer).textContent = '0'
            nextPlayer()
        } else if (dice !== 1 && dice1 !== 1) {
            roundScore += dice + dice1
            document.querySelector("#current-" + activPlayer).textContent = roundScore
        } else {
            nextPlayer()
        }
        lastRoll = dice
    }


})

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {


        score[activPlayer] += roundScore
        document.querySelector("#score-" + activPlayer).textContent = score[activPlayer]
        var input = document.querySelector(".final-score").value
        var winCount
        if (input) {
            winCount = input
        } else {
            winCount = 100
        }
        if (score[activPlayer] >= winCount) {
            document.querySelector("#name-" + activPlayer).textContent = "Winner"
            document.querySelector("#dice-1").style.display = "none"
            document.querySelector("#dice-2").style.display = "none"
            document.querySelector(".player-" + activPlayer + "-panel").classList.add("winner")
            document.querySelector(".player-" + activPlayer + "-panel").classList.remove("active")
            gamePlaying = false

        } else {
            nextPlayer();
        }

    }


})

function nextPlayer() {
    activPlayer === 0 ? activPlayer = 1 : activPlayer = 0
    roundScore = 0

    document.querySelector("#current-0").textContent = 0
    document.querySelector("#current-1").textContent = 0

    document.querySelector("#dice-1").style.display = "none"
    document.querySelector("#dice-2").style.display = "none"
    document.querySelector(".player-0-panel").classList.toggle("active")
    document.querySelector(".player-1-panel").classList.toggle("active")

}

document.querySelector(".btn-new").addEventListener("click", init)

function init() {
    score = [0, 0]
    roundScore = 0
    activPlayer = 0
    gamePlaying = true
    document.querySelector("#dice-1").style.display = "none"
    document.querySelector("#dice-2").style.display = "none"

    document.querySelector("#score-0").textContent = "0"
    document.querySelector("#score-1").textContent = "0"
    document.querySelector("#current-0").textContent = "0"
    document.querySelector("#current-1").textContent = "0"
    document.querySelector("#name-0").textContent = "Player 1"
    document.querySelector("#name-1").textContent = "Player 2"
    document.querySelector(".player-0-panel").classList.remove("active")
    document.querySelector(".player-1-panel").classList.remove("active")
    document.querySelector(".player-0-panel").classList.remove("winner")
    document.querySelector(".player-1-panel").classList.remove("winner")
    document.querySelector(".player-0-panel").classList.add("active")

}