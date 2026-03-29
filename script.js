const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModel = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-restart")


const highScoreElement=document.querySelector("#high-score")
const scoreElement=document.querySelector("#score")
const tineElement=document.querySelector("#time")


const blockheight = 50;
const blockwidth = 50;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

let intervalId = null;
let timerIntervalId = null;


let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
let highscore=localStorage.getItem("highscore") || 0
let score=0
let time=`00-00`

highScoreElement.innerText=highscore

const blocks = [];
//in graph x represent the row and y represent the column
let snake = [
  {
    //snake head
    x: 1,
    y: 3,
  },
];

let direction = "down";
//both for loop make equal number of block
// for (let i = 0; i < rows*cols;i++) {
//     const block=document.createElement('div');
//     block.classList.add("block")
//     board.appendChild(block);
// }

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    //back tick used for string interpolation.
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  //direction consitions
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    //stop the interval
    clearInterval(intervalId);
    modal.style.display="flex"
    startGameModal.style.display="none"
    gameOverModel.style.display="flex"
    return;
  }

  //food consume logic
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.unshift(head);
    score+=10
    scoreElement.innerText=score

    if(score > highscore){
      highscore=score
      localStorage.setItem("highscore",highscore.toString())
    }
  }
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  //add element using unshift method
  snake.unshift(head);
  //remove last element using pop method
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}


startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);
  timerIntervalId = setInterval(()=>{
    let [min , sec]=time.split("-").map(Number)

    if(sec==59)
    {
      min+=1
      sec=0
    }else{
      sec+=1
    }

    time = `${min}-${sec}`
    tineElement.innerText=time
  },1000)
});


restartButton.addEventListener("click",restartGame)

function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  score=0
  time=`00-00`
  scoreElement.innerText=score
  tineElement.innerText-time
  highScoreElement.innerText=highscore
  modal.style.display = "none";
  direction="down"
  snake = [{ x: 1, y: 3 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => {
    render();
  }, 300);
}


addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  }
});
