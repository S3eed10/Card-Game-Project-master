// Variable's
let timerOut = true;
let timerId = 0;
let time = 0;
let openCard = [];
let opened = 0;
let movesCounter = 0;
let heartsCount = 0;


// === For Listener ===
const deck = document.querySelector("#deck");

deck.addEventListener("click", (event) => {
    let clickTarget = event.target;
    if (validClick(clickTarget)) {
        if (timerOut) {
            initTime();
        };

        addCard(clickTarget);
        addOpenCard(clickTarget);

        if (openCard.length === 2) {
            checkForMatch(clickTarget);
            moveAdd();
            score();
        }
    }

    
});

// === For Validations ===
const validClick = (clickTarget) => {
    return (
        clickTarget.classList.contains("card") &&
        !clickTarget.classList.contains("match") &&
        openCard.length < 2 &&
        !openCard.includes(clickTarget)
    );
};

// === For InitTime ===
const initTime = () => {
    timerOut = false;
    timerId = setInterval(() => {
        time++;
        timerCount();
    }, 1000);
};

// === For TimerCount ===
function timerCount() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    if (sec < 10) {
        timer.innerHTML = `${min}:0${sec}`;
    } else {
        timer.innerHTML = `${min}:${sec}`;
    }
};

// === Functions for help ===
const addCard = (card) => {
    card.classList.add("open");
};
const removeCard = (clickTarget) => {
    clickTarget.classList.remove("open");
}
const addOpenCard = (clickTarget) => {
    openCard.push(clickTarget);
};

// === For Matching ===
const checkForMatch = () => {
    if (
        openCard[0].firstElementChild.className ===
        openCard[1].firstElementChild.className
    ){
        openCard[0].classList.add("match");
        openCard[1].classList.add("match");
        openCard = [];
        opened++;
        if (opened == 8) {
            winConditon();
        }
    }else {
        setTimeout(() => {
            removeCard(openCard[0]);
            removeCard(openCard[1]);
            openCard = [];
        }, 1000);
    }
};

// === For WinConditon ===
if (opened == 8) {
    winConditon();
};
const winConditon = () => {
    stopTimer();
};

// === For StopTimer ===
const stopTimer = () => {
    timerOut = false;
    clearInterval(timerId);
    timerCount();
};

// === For Move ===
const moveAdd = () => {
    movesCounter++;
    const moves = document.querySelector("#moves");

    console.log(`Moves:${movesCounter}`);
    moves.innerHTML = movesCounter;
};

// === For Score ===
const score = () => {
    if (movesCounter === 8 || movesCounter === 16) {
        decHert();
    };
};

// === For DecHert ===
const decHert = () => {
    const heartsList = document.querySelectorAll("#heart li");

    for (heart of heartsList) {
        if (heart.style.display != "none") {
            heart.style.display = "none";
            break;
        };
    };
};

// === For Restart ===
const restart = document.querySelector("#restart");
restart.addEventListener("click", () => {
    gameReset();
});

// === For GameReset ===
const gameReset = () => {
    timeReset();
    moveReset();
    heartReset();
    shuffling();
    coverCards();
    opened = 0;
    openCard = [];
}

// === For TimeReset ===
const timeReset = () => {
    stopTimer();
    timerOut = true;
    time = 0;
    timerCount();
};

// === For MoveReset ===
const moveReset = () => {
    movesCounter = 0;
    document.querySelectorAll("#moves").innerHTML = movesCounter;
}

/** 
// ===For HeartCount ===
const countHearts = () => {
    const heartsList = document.querySelectorAll("#heart li");
    heartsCount = 0;

    for (heart of heartsList) {
        if (heart.style.display !== "none") {
            heartsCount++;
        };
    };
    return heartsCount;
};
**/

// === For HeartReset ===
const heartReset = () => {
    heartsCount = 0;
    const heartsList = document.querySelectorAll("#heart li");

    for (heart of heartsList) {
        heart.style.display = "inline";
    };
};

// === For Shuffel Function "Reference from stackOverFlow" ===
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
};

// === For Shuffling ===
const shuffling = () => {
    const arr = Array.from(document.querySelectorAll("#deck li"));
    const shuffled = shuffle(arr);
    for (card of shuffled) {
        deck.appendChild(card);
    };
};
shuffling();

// === For CoverCard ===
const coverCards = () => {
    const cards = document.querySelectorAll("#deck li");
    for (let card of cards) {
        card.className = "card";
    };
};