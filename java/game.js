/* to do:
    enable input
    make game checker function

*/

let cl = console.log;
let size = 4;
const board = document.querySelector("#board");
let arrayRows = createBoard();

function createBoard() {
    let arrayRows = [];
    for (let i = 0; i < size; i++) {
        arrayRows[i] = [];
        for (let j = 0; j < size; j++) {
            arrayRows[i][j] = " ";
        }
    }
    return arrayRows;
}


function makeDivs() {

    for (let i = 0; i < arrayRows.length; i++) {
        for (let j = 0; j < arrayRows[i].length; j++) {
            cl("i =", i);
            let tile = document.createElement("div");
            board.appendChild(tile);
            tile.innerHTML = arrayRows[i][j]
            tile.classList.add("tile")
        }
    }
}


let riddleTemplates = [riddleTemplate1, riddleTemplate2]

function riddleTemplate1() {
    arrayRows[1][0] = "3";
    arrayRows[1][1] = "1";
    arrayRows[2][2] = "3";
    arrayRows[3][2] = "2";
}

function riddleTemplate2() {
    arrayRows[1][0] = "3";
    arrayRows[1][1] = "1";
    arrayRows[2][2] = "3";
    arrayRows[3][2] = "2";
}

// setGameTemplate1();

function setRiddleTemplate() {
    (riddleTemplates[Math.floor(Math.random() * riddleTemplates.length)])()
}

function enableTileInput() {
    for (let i = 0; i < arrayRows.length; i++) {
        for (let j = 0; j < arrayRows[i].length; j++) {
            if (arrayRows[i][j].innerHTML == " "){
               // arrayRows[i][j].innerHTML.style.opacity = "0"
            }
        }
    }
}

makeDivs();
setRiddleTemplate();



board.style.width = "size*10vh";



/* loop
for (let i = 0; i < arrayRows.length; i++) {
        for (let j = 0; j < arrayRows[i].length; j++) {
            if (arrayRows[i][j].innerHTML == "#"){
                arrayRows[i][j].innerHTML.style.opacity = "0"
            }
        }
    }
        */


