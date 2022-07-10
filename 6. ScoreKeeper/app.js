const p1Button = document.querySelector("#p1Button");
const p2Button = document.querySelector("#p2Button");
const p1Display = document.querySelector("#p1Score");
const p2Display = document.querySelector("#p2Score");
const reset = document.querySelector("#reset");
const scoreSelect = document.querySelector("#playTo");


let p1Score = 0;
let p2Score = 0;
let winOn = 3;
let isGameOver = false;

p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score === winOn) {
            isGameOver = true;
        }
        p1Display.textContent = p1Score;
    }
})

p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score === winOn) {
            isGameOver = true;
        }
        p2Display.textContent = p2Score;
    }
})

scoreSelect.addEventListener('change', function () {
    winOn = parseInt(this.value);
    re();
})
reset.addEventListener('click', re)

function re() {
    p1Score = 0;
    p2Score = 0;
    isGameOver = false;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
}