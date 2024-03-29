var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");

var cvs1 = document.getElementById("secondcanvas");
var ctx1 = cvs1.getContext("2d");
let eating = false;
cvs1.style.visibility = 'hidden'
// create the constant variable with 32 pixels cause one square a = 32 pixels
const sq = 32;
paused = false;
var idInterval;

//load images from the folder in the Sublime

const green = new Image();
green.src = "img/Full.png";

const taco = new Image();
taco.src = "img/taco.png";

//call draw function every 100m
var game = setInterval(draw,100);

//create the snake out of the squares with x postion of 9 and y postiton of10
//snake is a 2d array as it has x and y coordinates
//snake[0] is the head

var snake = [];
snake[0] = {
	x : 288,
	y : 320
}

let snack = sq

generateRandom();

function hidecanvas(){
  if (cvs1.style.visibility === 'hidden') {
    cvs1.style.visibility = 'visible';
  }else{
    cvs1.style.visibility = 'hidden';
  }
}

function generateRandom(){
	snack = {
		x : Math.floor(Math.random()*17+1) * sq,
		y : Math.floor(Math.random()*15+3) * sq
	}
	console.log(snack);
}

print()
//create tGE score var

var score = 0

//pause function

//cordinates recording


//control the snake as it m-oves

var m;

document.addEventListener('keydown',m);

function direction(event){
	
}

//pause the snake game if the player presses space
function Pause(){
    if (!paused){
       paused = true;
       game = clearInterval(idInterval)
    }else if (paused){
       paused= false;
       idInterval = setInterval(game, 100)
    }
}
function print(){
	if(!eating){
	ctx.fillStyle = "RandomColor";
	ctx.font = "40px Comic Sans";
	ctx.fillText("x",7*sq,1*sq);
	ctx.fillText(snack.x/32,6.7*sq,2.4*sq);
	ctx.fillStyle = "RandomColor";
	ctx.font = "40px Comic Sans";
	ctx.fillText("yi",11*sq,1*sq);
	ctx.fillText(-snack.y/32,10.7*sq,2.4*sq);
	}
}

function RandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let c = 0; c < 6; c++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function setRandomColor() {
  $("#colorpad").css("background-color", RandomColor());
}

window.addEventListener('keydown', function (e){
	var key = e.keyCode;
	if (key === 32){
    Pause();
	}

	console.log(m);
	if(key == 37 && m != "RIGHT"){
		m = "LEFT";
	}else if(key == 38 && m != "DOWN"){
		m = "UP";
	}else if(key == 39 && m != "LEFT"){
		m = "RIGHT";
	}else if(key == 40 && m != "UP"){
		m = "DOWN";
	}
	console.log(m);
});

//snakeX, snakeY, snakeX+sq, snakeY+sq, snack.x, snack.y, snack.x+sq, snack.y+sq
function overlap(lx1, ly1, rx1, ry1, lx2, ly2, rx2, ry2) {
/*	if (lx1 > rx2 || lx2 > rx1){
		return false
	}
	else if (ly1 > ry2 || ly2 > ry1){
		return false
	}else{
		return true
	}*/

	
	if(lx1==lx2 && ly1==ly2 && rx1==rx2 && ry1==ry2){
		return true;
	}else{
		return false;
	}
}


//check collision snake
function intersection(head, array){
	for(var k=1; k<array.length; k++){
		if(head.x === array[k].x && head.y ===array[k].y){
			return true;
		}else{
			return false;
		}
	}
}

//draw everything to the canvas
// draw is called everytime
//press space bar to resume the game after eating a snack
function draw(){
	
	ctx.drawImage(green,0,0);

	ctx1.fillStyle ="green";
	ctx1.fillRect(0, 0, 17*sq, 15*sq);
	ctx1.fillStyle = "black";
	ctx1.font = "40px Impact";
	ctx1.textAlign = "center";
	ctx1.fillText("Game Over", 4.5*sq, 2.5*sq);
	ctx1.fillStyle = "black";
	ctx1.font = "12px Comic Sans";
	ctx1.textAlign = "center";
	ctx1.fillText("Please click New Game to restart the Snake game", 4.5*sq, 3*sq);

	for(var i = 0; i < snake.length; i++){
		ctx.fillStyle = ( i==0 )? "coral":"black";//condition if  fillstyle is green and i == 0 and coral - the snake head is coral the rest is black
		ctx.fillRect(snake[i].x,snake[i].y,sq,sq);

		ctx.strokeStyle = "lightsalmon";
		ctx.strokeRect(snake[i].x,snake[i].y,sq,sq);

	}
	changeMode();
	ctx.drawImage(taco, snack.x, snack.y, sq, sq);

	//old head postition
	var newHeadX = snake[0].x;
	var newHeadY = snake[0].y;

	
	//which direction
	if(m == "LEFT") newHeadX -= sq;
	if(m == "UP") newHeadY -= sq;
	if(m == "RIGHT") newHeadX += sq;
	if(m == "DOWN") newHeadY += sq;

	//Lunch timemeemememem
	if(overlap(newHeadX, newHeadY, newHeadX+sq, newHeadY+sq, snack.x, snack.y, snack.x+sq, snack.y+sq)){
		eating = true;
	}
	else {
		eating = false;
		print();
	}
	if(eating){
		score++
		/*ctx.fillStyle ="white";
		ctx.font = "40px Comic Sans"
		ctx.fillText(coordinates, 6*sq,1.7*sq);*/
		//create a function that switches between the canvases and point out hte coordinates of the snake

		generateRandom();
	}else{
		//remove the tail as it is moving
		snake.pop();
	}

	function changeMode(){
		if (score%10 == 0 && score != 0){

			ctx.fillStyle =RandomColor();
			ctx.fillRect(sq, 3*sq, 17*sq, 15*sq);

			for(var i = 0; i < snake.length; i++){
			ctx.fillStyle = ( i==0 )? "lightpink":"aliceblue";//condition if  fillstyle is green and i == 0 and coral - the snake head is coral the rest is black
			ctx.fillRect(snake[i].x,snake[i].y,sq,sq);

			ctx.strokeStyle = "mediumpurple";
			ctx.strokeRect(snake[i].x,snake[i].y,sq,sq);
			}
		}
	}
	//add new Head

	let newHead = {
		x : newHeadX,
		y : newHeadY
	}
	
	//gameover
	if((newHeadX < (0.8*sq)) || (newHeadX > (17 * sq)) || (newHeadY < (3 * sq)) || (newHeadY > (17 *sq)||intersection(newHead,snake))){
		clearInterval(game);
		hidecanvas()
		console.log("clearInterval");

	}


	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "40px Comic Sans";
	ctx.fillText(score,3.7*sq,1.7*sq);
}