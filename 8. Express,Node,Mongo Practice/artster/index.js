const figlet = require("figlet");
const color = require("colors");
const cow = require("cowsay");

figlet("Golu is GAY!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(cow.say({
        text: data,
        e: "oO",
        T: "U "
    }).rainbow);
});