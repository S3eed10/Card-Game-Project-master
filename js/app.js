function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// varible
const deck = document.querySelector("#deck");
const starts = document.querySelector("#heart li");
const moves = document.querySelector("#moves");
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const cardToShuffle = document.querySelector("#deck li");
let openCard = [];
let arr = Array.from(cardToShuffle);
let movesCounter = 0;
let timerOut = true;
let match = 0;
let time = 0;
let timerId = 0;

//functions

function timerCount() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    time++; //why?
    if (sec < 10) {
        timer.innerHTML = `${min}:0${sec}`;
    } else {
        timer.innerHTML = `${min}:${sec}`;
    }
};
//================================================
function initTime() {
    timerOut = false;
    timerId = setInterval(() => {
        timerCount();
    }, 1000);
};
//================================================
function stopTimer() {
    timerOut = flase;
    clearInterval(timerId);
    time = 0;
    timerCount();
}


// event listeners
deck.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target) {
        if (timerOut) {
            initTime();
        }
    }
    event.target.classList.add("open");
    openCard.push(event.target);

    if (openCard.length === 2) {
        // match()
    }
})
//==============================================
restart.addEventListener("click", (event) => {
    if (event.target) {
        stopTimer();
    }
});