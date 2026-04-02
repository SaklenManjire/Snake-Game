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

const startGameSound=new Audio("Music/Start-Game.mp3");
const EndGameSound=new Audio("Music/End-Game.mp3");
const FoodConsumeSound=new Audio("Music/Food-Consume.mp3")
const MoveSound=new Audio("Music/Move.mp3");

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


  //direction conditions
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
    EndGameSound.play();
    modal.style.display="flex"
    startGameModal.style.display="none"
    gameOverModel.style.display="flex"
    return;
  }

  blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("head-fill")
  //snake own tail touch game over logic
  snake.forEach(segment=>{
    if(head.x ==segment.x && head.y == segment.y)
    {
    clearInterval(intervalId);
    EndGameSound.play();
    modal.style.display="flex"
    startGameModal.style.display="none"
    gameOverModel.style.display="flex"
    return;
    }
  })

  //food consume logic
  if (head.x == food.x && head.y == food.y) {
    FoodConsumeSound.play();
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
    blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("head-fill")
  });

  //add element using unshift method
  snake.unshift(head);
  //remove last element using pop method
  snake.pop();

  
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    blocks[`${snake[0].x}-${snake[0].y}`].classList.add("head-fill")
  });
   
}


startButton.addEventListener("click",() => {
  startGameSound.play();
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
  startGameSound.play();
  blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("head-fill")
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
  console.log(event.key)
  if (event.key == "ArrowUp" || event.key == "w") {
    MoveSound.play();
    direction = "up";
  } else if (event.key == "ArrowDown" || event.key == "s") {
    MoveSound.play();
    direction = "down";
  } else if (event.key == "ArrowLeft" || event.key == "a") {
    MoveSound.play();
    direction = "left";
  } else if (event.key == "ArrowRight" || event.key == "d") {
    MoveSound.play();
    direction = "right";
  }
});
