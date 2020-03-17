let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let botDoorPath="https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg"
let beachDoorPath="https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg"
let spaceDoorPath="https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg"

//This variable work with the isClick funtiont.
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"

//This is a JS DOM to start our game.
let startButton = document.getElementById('start');

//These will work with our const randomChoreDoorGenerator to randomize the content of the doors
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;


//Function to check if a door has the game-ending ChoreBot.
const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  } else {
    return false;
}
}
//This will ensure that only one door can be click on at a time. This help prevent players from cheating.

const isClicked = (door) =>{
  if (door.src === closedDoorPath) {
  return false;
} else {
  return true;
}
}
//This function will check if the game winning condition is met @ (numClosedDoors === 0) and it also decreases numClosedDoors variable.
const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
  gameOver('win');
}else if (isBot(door)) {
  gameOver('lose');
} 
}
//This function utilize the variables above to randomize our door's content.
const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  }else if(choreDoor === 1){
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  }else {(choreDoor === 2)
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath; 
  }
}

door1.onclick = () => {
  if (currentlyPlaying && !isClicked(door1)){
doorImage1.src=openDoor1;
  playDoor(door1);
  }
}
door2.onclick = () => {
  if(currentlyPlaying && !isClicked(door2)) {
  doorImage2.src=openDoor2;
  playDoor(door2);
  }
}
door3.onclick = () => {
  if(currentlyPlaying && !isClicked(door3)) {
  doorImage3.src=openDoor3;
  playDoor(door3);
  }
}

//This function will help us refresh our game anytime we finish playing instead of us manually clicking refresh.
startButton.onclick = () => {
  if(!currentlyPlaying) {
  startRound();
 }
}

//This function will reset all the objects will call inside it.
const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good luck!';
  randomChoreDoorGenerator();
}

//Function to determine win or lose
const gameOver = (status) => {
  if (status === 'win') {
  startButton.innerHTML = 'You win! Play again?';
}else {
  startButton.innerHTML = 'Game over! Play again?';
}
  currentlyPlaying = false;
}
//This will help us call our function to check if the images are random.
//randomChoreDoorGenerator();
startRound();