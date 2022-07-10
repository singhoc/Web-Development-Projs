const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Score")
}
const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Score")
}

const reset = document.querySelector("#reset");
const scoreSelect = document.querySelector("#playTo");

let winOn = 3;
let isGameOver = false;

function scoreKeeper(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winOn) {
            isGameOver = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function () {
    scoreKeeper(p1, p2);
})

p2.button.addEventListener('click', function () {
    scoreKeeper(p2, p1);
})

scoreSelect.addEventListener('change', function () {
    winOn = parseInt(this.value);
    re();
})
reset.addEventListener('click', re)

function re() {
    isGameOver = false;
    for (p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }

}