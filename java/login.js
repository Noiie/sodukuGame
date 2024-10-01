// Log in
const allowedUsers = [
    { name: "Noi", password: "1234" },
    { name: "Naama", password: "1234" },
    { name: "guest", password: "1234" }

];

function seeIfLoginValid() {
    const UsernameInserted = document.getElementById("loginUsername").value;
    const PasswordInserted = document.getElementById("loginPassword").value;

    let confirmedUser = false;
    for (let i = 0; i < allowedUsers.length; i++) {
        if (allowedUsers[i].name === UsernameInserted && allowedUsers[i].password === PasswordInserted) {
            confirmedUser = true;
            break;
        }
    }
    confirmedUser ? (document.getElementById("playButton").style.display = "block") : alert("sHe dOesn't EveN go HeRe. Try again.");
}

// Sign up 
if (!localStorage.getItem("allowedUsers"))
    localStorage.setItem("allowedUsers", JSON.stringify([]));

let Form = { Username: "", password: "" };

function MakeUserPasswordObjects() {
    Form = {
        Username: document.getElementById("signupUsername").value,
        password: document.getElementById("signupPassword").value
    };
}

function SignedIn() {
    let users = JSON.parse(localStorage.getItem("allowedUsers"));
    localStorage.setItem("allowedUsers", JSON.stringify([...users, Form]));
    alert("we have your info and you can never leave");
    document.getElementById("secondPlayButton").style.display = "block";
}

//still missing: commands to push key-value pairs from signed in array (stored in local storage) to logged in array (stored as objects)
// function pushSignedInUserToLoggedIn() {
//     let users = JSON.parse(localStorage.getItem("allowedUsers"));
//     users.push(signedInUser);}
