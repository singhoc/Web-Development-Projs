const franc = require("franc");
const colors = require("colors");
const langs = require("langs");

const input = process.argv[2];

const langCode = franc(input);
if (langCode === 'und') {
    console.log("This is no good".red);
} else {
    console.log(langs.where("3", langCode).name.rainbow);
}