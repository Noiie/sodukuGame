
let cl = console.log;
let size = 4;
const board = document.querySelector("#board");
let arrayRows = createBoard();
let divs = makeDivs();
let submitButton = document.getElementById("submit")

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
            tile.innerHTML = ""
            tile.classList.add("tile")
            tile.setAttribute('id', `${i}${j}`)
        }
    }
}


let riddleTemplates = [riddleTemplate1, riddleTemplate2]

function riddleTemplate1() {
    arrayRows[0][1] = "1";
    document.getElementById("01").innerHTML = "1";
    arrayRows[0][3] = "4";
    document.getElementById("03").innerHTML = "4";
    arrayRows[3][0] = "4";
    document.getElementById("30").innerHTML = "4";
    arrayRows[3][2] = "3";
    document.getElementById("32").innerHTML = "3";

}

function riddleTemplate2() {
    arrayRows[0][1] = "3";
    document.getElementById("01").innerHTML = "3";
    arrayRows[1][3] = "3";
    document.getElementById("13").innerHTML = "3";
    arrayRows[2][0] = "1";
    document.getElementById("20").innerHTML = "1";
    arrayRows[3][2] = "4";
    document.getElementById("32").innerHTML = "4";
}


function setRiddleTemplate() {
    (riddleTemplates[Math.floor(Math.random() * riddleTemplates.length)])()
}

function enableTileInput() {
    for (let i = 0; i < board.children.length; i++) {
        if (board.children[i].innerHTML === "") {
            let input = document.createElement("input")
            input.classList.add("input-box")
            board.children[i].appendChild(input)
            let parentInputId = input.parentElement.id
            input.addEventListener("change", (event) => storeUserInput(event, parentInputId))
        }
    }
}

function storeUserInput(event, id) {
    let x = Number(id[0])
    let y = Number(id[1])
    arrayRows[x][y] = event.target.value

}

function checkIfSodokuIsFilled() {
    for (let i = 0; i < arrayRows.length; i++) {

        for (let j = 0; j < arrayRows[i].length; j++) {

            if (arrayRows[i][j].trim() === "") {
                document.getElementById("errorMessage").innerHTML = "Soduko is not completely filled out. finish it to free kowalski"
                document.getElementById("errorMessage").style.color = "red"
                break;
            }
        }
    }
}


function submit() {
    checkIfSodokuIsFilled()
    checkRows()
    checkCols()
    checkBigSquare()
}



setRiddleTemplate();
enableTileInput();
submitButton.addEventListener("click", submit);




/* loop
for (let i = 0; i < arrayRows.length; i++) {

        for (let j = 0; j < arrayRows[i].length; j++) {
        
            if (arrayRows[i][j].innerHTML == "#"){
            
                arrayRows[i][j].innerHTML.style.opacity = "0"
                
            }
        }
    }
        */
function checkRows() {
    for (let i = 0; i < arrayRows.length; i++) {
        const unique = [...new Set(arrayRows[i])]
        if (unique.length !== arrayRows[i].length) {
            console.log("repetitive nr in row")
            // make it go to fail page
            redirectFail();

        }

    }
}

function checkCols() {
    for (let j = 0; j < arrayRows.length; j++) {

        let testArrayRow = []
        for (let i = 0; i < arrayRows.length; i++) {
            y = arrayRows[i][j]
            testArrayRow.push(y)

            const unique = [...new Set(testArrayRow[i])]
            if (unique.length !== testArrayRow[i].length) {
                console.log("repetitive nr in col")
                // make it go to fail page
                redirectFail();
            }
        
        }
    }
}

let upperLeftQ = [arrayRows[0][0], arrayRows[0][1], arrayRows[1][0], arrayRows[1][1]]
let lowerLeftQ = [arrayRows[2][0], arrayRows[2][1], arrayRows[3][0], arrayRows[3][1]]
let lowerRightQ = [arrayRows[2][2], arrayRows[2][3], arrayRows[3][2], arrayRows[3][3]]
let upperRightQ = [arrayRows[0][2], arrayRows[0][3], arrayRows[1][2], arrayRows[1][3]]
let allQuadrants = [upperLeftQ, lowerLeftQ, lowerRightQ, upperRightQ]

// function redirectFail() {
//     window.location.replace("../html/home.html");
//  }  
redirectFail();
function checkBigSquare() {
    if (size == 4) {
        for (let i = 0; i < arrayRows.length; i++) {
            const unique = [...new Set(allQuadrants[i])]
            if (unique.length !== allQuadrants[i].length) {
                console.log("repetitive nr in row")
                // make it go to fail page
                redirectFail();
            }
        }
    }

}