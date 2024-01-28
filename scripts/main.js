const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
};

function playSound(audioName) {
    let audio = new Audio(`../assets/sounds/${audioName}.m4a`);
    audio.volume = 0.28
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = (Math.trunc(state.values.currentTime/60) < 10? "0" + Math.trunc(state.values.currentTime/60) : Math.trunc(state.values.currentTime/60)) + ":" + (state.values.currentTime%60 < 10? "0" + state.values.currentTime%60 : state.values.currentTime%60);

    if (state.values.currentTime < 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.values.currentTime++;
        state.view.timeLeft.textContent = (Math.trunc(state.values.currentTime/60) < 10? "0" + Math.trunc(state.values.currentTime/60) : Math.trunc(state.values.currentTime/60)) + ":" + (state.values.currentTime%60 < 10? "0" + state.values.currentTime%60 : state.values.currentTime%60);
        state.values.hitPosition = 0;
        alert("Game Over! O seu resultado foi: " + state.values.result);
    };
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = 0;
                playSound("hit")
            };
        });
    });
};

function init() {
    addListenerHitBox();
};

init();