let max = parseInt(prompt("Enter your maximum number!"));
while (!max) {
    max = parseInt(prompt("Enter a valid number!"));
}
const targetNum = Math.floor(Math.random() * max) + 1;

console.log(targetNum);

let guess = (prompt("Enter your guess"));
let attempts = 1;
while (parseInt(guess) !== targetNum) {
    if (guess === 'q') break;
    attempts++;
    if (parseInt(guess) > targetNum) {
        guess = (prompt("Too high!"));
    } else {
        guess = (prompt("Too Low!"));
    }
}
if (guess === 'q') {
    console.log('Why quit');
} else {
    console.log(`It took you ${attempts} guesses to reach ${targetNum}`);
}