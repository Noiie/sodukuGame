let cl = console.log;
let size = 9; // set to 4 or 9
const board = document.querySelector("#board");
let arrayRows = createBoard();
let divs = makeDivs();
let submitButton = document.getElementById("submit")

//make array items that will get a div in the future
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

//create divs for each Array item
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

//adapt styling for gamesize
function adatpCssToGamesize(){
    if(size = 4){
        document.querySelector(".tile").style.width
    }
}

function adatpCssToGamesize() {
    const board = document.querySelector('#board');
    const tiles = document.querySelectorAll('.tile');

    board.style.width = "";
    board.style.height = "";

    if (size === 4) {
        board.style.width = "80vh"; 
        board.style.height = "80vh"; 

        tiles.forEach(tile => {
            tile.style.width = "20vh"; 
            tile.style.height = "20vh";
        });

        console.log("Setting up a 4x4 grid");

    } else if (size === 9) {
        board.style.width = "72vh"; 
        board.style.height = "72vh"; 
        tiles.forEach(tile => {
            tile.style.width = "8vh";
            tile.style.height = "8vh";
        });

        console.log("Setting up a 9x9 grid");
    } else {
        console.error("Unsupported grid size!");
    }
}



// hardcoded starting-boards,added to an array
function smallRiddleTemplate1() {
    arrayRows[0][1] = "1";
    document.getElementById("01").innerHTML = "1";
    arrayRows[0][3] = "4";
    document.getElementById("03").innerHTML = "4";
    arrayRows[3][0] = "4";
    document.getElementById("30").innerHTML = "4";
    arrayRows[3][2] = "3";
    document.getElementById("32").innerHTML = "3";

}

function smallRiddleTemplate2() {
    arrayRows[0][1] = "3";
    document.getElementById("01").innerHTML = "3";
    arrayRows[1][3] = "3";
    document.getElementById("13").innerHTML = "3";
    arrayRows[2][0] = "1";
    document.getElementById("20").innerHTML = "1";
    arrayRows[3][2] = "4";
    document.getElementById("32").innerHTML = "4";
}


let smallRiddleTemplates = [smallRiddleTemplate1, smallRiddleTemplate2]

function bigRiddleTemplate1() {
    arrayRows[0][4] = "8";
    document.getElementById("04").innerHTML = "8";
    arrayRows[0][6] = "1";
    document.getElementById("06").innerHTML = "1";
    arrayRows[1][7] = "4";
    document.getElementById("17").innerHTML = "4";
    arrayRows[1][8] = "3";
    document.getElementById("18").innerHTML = "3";
    arrayRows[2][0] = "5";
    document.getElementById("20").innerHTML = "5";
    arrayRows[3][4] = "7";
    document.getElementById("34").innerHTML = "7";
    arrayRows[3][6] = "8";
    document.getElementById("36").innerHTML = "8";
    arrayRows[4][6] = "1";
    document.getElementById("46").innerHTML = "1";
    arrayRows[5][1] = "2";
    document.getElementById("51").innerHTML = "2";
    arrayRows[5][4] = "3";
    document.getElementById("54").innerHTML = "3";
    arrayRows[6][0] = "6";
    document.getElementById("60").innerHTML = "6";
    arrayRows[6][7] = "7";
    document.getElementById("67").innerHTML = "7";
    arrayRows[6][8] = "5";
    document.getElementById("68").innerHTML = "5";
    arrayRows[7][2] = "3";
    document.getElementById("72").innerHTML = "3";
    arrayRows[7][3] = "4";
    document.getElementById("73").innerHTML = "4";
    arrayRows[8][3] = "2";
    document.getElementById("83").innerHTML = "2";
    arrayRows[8][6] = "6";
    document.getElementById("86").innerHTML = "6";
}

let bigRiddleTemplates = [bigRiddleTemplate1]



function setRiddleTemplate() {
    if (size == 4){
    (smallRiddleTemplates[Math.floor(Math.random() * smallRiddleTemplates.length)])()
    }
    else {
    (bigRiddleTemplates[Math.floor(Math.random() * bigRiddleTemplates.length)])()
    }
}

//make tiles editable for users
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


//mechanisms to check the filled out riddle
function submit() {
    if (!checkIfComplete()) {return}
    if (!checkRows()) {return}
    if (!checkCols()){return}
    //checkBigSquare()
    redirectSuccess()
}


function redirectFail() {
    window.location.replace("../html/fail.html");
}

function redirectSuccess() {
    window.location.replace("../html/success.html");
}


function checkIfComplete() {
    for (let i = 0; i < arrayRows.length; i++) {
        for (let j = 0; j < arrayRows[i].length; j++) {
            let value = Number(arrayRows[i][j].trim());
            // Check if cell is empty or if value is out of the valid range
            if (arrayRows[i][j].trim() === "" || value < 1 || value > size) {
                document.getElementById("errorMessage").innerHTML = "Sudoku is not completely filled out or contains invalid numbers. Please finish it to free Kowalski!";
                document.getElementById("errorMessage").style.color = "red";
                return false; // Fail if any cell is empty or has invalid value
            }
        }
    }
    return true; // All cells are filled and valid
}

function checkRows() {
    for (let i = 0; i < arrayRows.length; i++) {
        const unique = [...new Set(arrayRows[i])]
        if (unique.length !== arrayRows[i].length) {
            console.log("repetitive nr in row")

            redirectFail();
            return false
        }

    }
    return true;
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
                redirectFail();
                return false
            }
        }
    }
    return true;
}



adatpCssToGamesize();
setRiddleTemplate();
enableTileInput();
submitButton.addEventListener("click", submit);



//junkyard:
/* loop
for (let i = 0; i < arrayRows.length; i++) {

        for (let j = 0; j < arrayRows[i].length; j++) {
        
            if (arrayRows[i][j].innerHTML == "#"){
            
                arrayRows[i][j].innerHTML.style.opacity = "0"
                
            }
        }
    }
        */


// function checkCols() {
//     for (let j = 0; j < arrayRows.length; j++) {

//         let testArrayRow = []
//         for (let i = 0; i < arrayRows.length; i++) {
//             y = arrayRows[i][j]
//             testArrayRow.push(y)

//             const unique = [...new Set(testArrayRow[i])]
//             if (unique.length !== testArrayRow[i].length) {
//                 console.log("repetitive nr in col")
//                 // make it go to fail page
//                 redirectFail();
//             }
//         }
//     }
// }

// let upperLeftQ = [arrayRows[0][0], arrayRows[0][1], arrayRows[1][0], arrayRows[1][1]]
// let lowerLeftQ = [arrayRows[2][0], arrayRows[2][1], arrayRows[3][0], arrayRows[3][1]]
// let lowerRightQ = [arrayRows[2][2], arrayRows[2][3], arrayRows[3][2], arrayRows[3][3]]
// let upperRightQ = [arrayRows[0][2], arrayRows[0][3], arrayRows[1][2], arrayRows[1][3]]
// let allQuadrants = [upperLeftQ, lowerLeftQ, lowerRightQ, upperRightQ]



// function checkBigSquare() {
//     if (size == 4) {
//         for (let i = 0; i < arrayRows.length; i++) {
//             const unique = [...new Set(allQuadrants[i])]
//             if (unique.length !== allQuadrants[i].length) {
//                 console.log("repetitive nr in row")
//                 // make it go to fail page
//                 // redirectFail();
//                 //this does not work yet!
//             }
//         }
//     }

// }




//checkIfSodokuIsFilled()