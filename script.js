const board = document.querySelector(".board");
const blockheight = 50;
const blockwidth = 50;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

const blocks = [];

//in graph x represent the row and y represent the column
const snake = [
  {
    //snake head
    x: 1,
    y: 3,
  },
];

let direction = "down";
//both for loop make equal number of bolck
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
    block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

setInterval(() => {
  let head = null;


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
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  //add element using unshift method
  snake.unshift(head);
  //remove last element using pop method
  snake.pop();

  render();
}, 400);

// script.js:71 ArrowUp
// script.js:71 ArrowDown
// script.js:71 ArrowLeft
// script.js:71 ArrowRight

addEventListener("keydown",(event) =>{
    if(event.key == "ArrowUp")
    {
        direction="up"
    }else if (event.key == "ArrowDown")
    {
        direction="down"
    }else if (event.key == "ArrowLeft")
    {
         direction="left"
    }else if (event.key == "ArrowRight")
    {
         direction="right"
    }
})