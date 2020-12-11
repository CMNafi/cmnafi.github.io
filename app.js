// jshint esversion :8
// jshint browser: true

console.log("Hello")
function paint (the_color) {
    let header = document.querySelector("h1");
    header.setAttribute("style",`color: ${the_color}`);
}
