let gameSequence = [];
let userSequence = [];
let h2 = document.querySelector("h2");
let boxes = ["crimson", "cyan", "orange", "purple"];
let allBoxes = document.querySelectorAll(".box");
let start = false;
let level = 0;
let highestLevel = 0;

document.addEventListener("keypress", function(){
    if(start == false){
        start = true;
        console.log("Game started")
        levelUp();
    }
});

function gameFlash(box) {
    box.classList.add("flash");
    setTimeout(function(){
        box.classList.remove("flash");
    },250);
}

function userFlash(box) {
    box.classList.add("userflash");
    setTimeout(function(){
        box.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSequence = [];
    level++;
    if (level > highestLevel){
        highestLevel = level;
    }
    h2.innerText = `Level ${level}`;
    
    // Random Box Choose
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = boxes[randomIndex];
    let randomButton = document.querySelector(`.${randomColor}`);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    gameFlash(randomButton);
}

function checkBox (index) {
    if(userSequence[index] === gameSequence[index]){
        if(userSequence.length == gameSequence.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML = `Game Over ! Your score was <b>${level}</b><br>Highest level was: ${highestLevel}<br>Press any key to start...`;
        document.querySelector("body").style.background = "red";
        setTimeout(function(){
            document.querySelector("body").style.background = "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)";
        },150);
        reset();
    }
}

function boxPress(){
    let box = this;
    userFlash(box);

    let userColor = box.getAttribute("id");
    userSequence.push(userColor);

    checkBox(userSequence.length-1);
}

for(box of allBoxes){
    box.addEventListener("click", boxPress);
}

function reset(){
    start = false;
    gameSequence = [];
    userSequence = []
    level = 0;
}