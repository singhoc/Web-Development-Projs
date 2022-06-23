const array = [];
while (1) {
    let command = prompt("What to do");
    if (command === 'new') {
        let input = prompt("new item");
        array.push(input);
        console.log(`${input} added to the list`);
    } else if (command === 'list') {
        console.log("****************");
        for (let j = 0; j < array.length; j++) {
            console.log(j + ': ' + array[j]);
        }
        console.log("****************");
    } else if (command === 'delete') {
        let index = parseInt(prompt("which index"));
        if (Number.isInteger(index)) {
            const deleted = array.splice(index, 1);
            console.log(`${deleted} removed from the list`);
        } else {
            console.log("Unknown input");
        }
    } else if (command === 'quit' || command === 'q') {
        break;
    } else {
        continue;
    }
}
console.log("you quit");