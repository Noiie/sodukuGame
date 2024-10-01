/////////////////////////////////////////////////////// Log in
let allowedUsers = [
    { Username: "Noi", password: "1234" },
    { Username: "Naama", password: "1234" },
    { Username: "guest", password: "1234" }
];

let firstUsers = JSON.stringify(allowedUsers);
localStorage.setItem("firstUsers", firstUsers);

function seeIfLoginValid() {
    const UsernameInserted = document.getElementById("loginUsername").value;
    const PasswordInserted = document.getElementById("loginPassword").value;

    // allowedUsers = JSON.parse(localStorage.getItem("allowedUsers"));

    let confirmedUser = false;

    let forNow = localStorage.getItem("firstUsers");
    forNow = JSON.parse(forNow);
    for (let i = 0; i < forNow.length; i++) {
    
        if (forNow[i].Username == UsernameInserted && forNow[i].password == PasswordInserted) {
            confirmedUser = true;
            break;
        }
    }
    
    if (confirmedUser) {
        localStorage.setItem("loggedInUser", UsernameInserted);
        document.getElementById("playButton").style.display = "block";
    } else {
        alert("sHe dOesn't EveN go HeRe. Try again.");
    }
}


///////////////////////////////////////////////////// Sign up 
if (!localStorage.getItem("firstUsers"))
    localStorage.setItem("firstUsers", JSON.stringify([]));

let Form = { Username: "", password: "" };


//gets information
function MakeUserPasswordObjects() {
    Form = {
        Username: document.getElementById("signupUsername").value,
        password: document.getElementById("signupPassword").value
    };
}

//adds sign up to local storage
function SignedIn() {
    let users = JSON.parse(localStorage.getItem("firstUsers"));
    localStorage.setItem("firstUsers", JSON.stringify([...allowedUsers, Form]));
    alert("we have your info and you can never leave");
    document.getElementById("secondPlayButton").style.display = "block";
}

//still missing: 
// 1) commands to push key-value pairs from signed in array (stored in local storage) to logged in array (stored as objects)
// 2) doesn't add loggedinuser to array of logged in users
// function pushSignedInUserToLoggedIn() {
//     let users = JSON.parse(localStorage.getItem("allowedUsers"));
//     users.push(signedInUser);}
