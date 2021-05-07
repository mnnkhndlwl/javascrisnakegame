// all constants and variables
let direc = { x: 0, y: 0 };
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else
{
    hiscoreval = JSON.parse(hiscore);
    hiscoreb.innerHTML = "High : 0" + hiscore;
}
const foodsound = new Audio('file:///I:/snake%20game/all%20media/food.wav');
const gameoversound = new Audio('file:///I:/snake%20game/all%20media/gameover.wav');
const movesound = new Audio('file:///I:/snake%20game/all%20media/move.mp3');
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if ((ctime - lastPaintTime) / 1000 <  1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
// part 1 : Updating the snake array and food

function isCollide(snake)  //collide
{
      // if it eats itself
      for(let i = 1; i<snakeArr.length;i++)
      {
          if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
          {
              return true;
          }
        }
 // if you collide with wall
          if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
          {
             return true;

          }
      return false;

}
function gameEngine() {
    if (isCollide(snakeArr)) {
        gameoversound.play();
        inputdir = { x: 0, y: 0 };
        alert("Game over. Press any key to restart");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

// regenerate food and increase score 
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
{
    foodsound.play();
    score +=1;
    if(score > hiscoreval)
    {
        hiscoreval = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscoreb.innerHTML = "High :" + hiscoreval;

    }
    scoreb.innerHTML = "Score : " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputdir.x , y: snakeArr[0].y + inputdir.y});
    let a = 2;
    let b = 16;
    food = {x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())}

}
//moving the snake
for(let i=snakeArr.length-2;i>=0;i--)
{
    
    snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputdir.x;
snakeArr[0].y += inputdir.y;



    // part 2 : display snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        skElement = document.createElement('div');
        skElement.style.gridRowStart = e.y;
        skElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            skElement.classList.add('head');
        }
        else {
            skElement.classList.add('snake');
        }
        board.appendChild(skElement);
    });
    
    // part 3 : display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}



// game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
     inputdir = { x: 0, y: 1 } //start game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;

    }

});


