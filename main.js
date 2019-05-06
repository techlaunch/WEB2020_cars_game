var points = 0;
var speed = 60;

// get HTML elements
var msgPoints = document.getElementById('points');
var msgSpeed = document.getElementById('speed');
var carOrange = document.getElementById('carOrange');
var carRed = document.getElementById('carRed');
var message = document.getElementById('message');
var body = document.getElementsByTagName('body')[0];

// position the red car
var cars = new Array();

// start with initial values
msgPoints.innerHTML = points + " cars avoided";
msgSpeed.innerHTML = speed + " mph";

// position the orange car
// lane #1: 60px
// lane #2: 130px
// lane #3: 200px
carOrange.style.top = parseInt(window.innerHeight) - 80 + "px";
carOrange.style.left = "130px"; // start in lane #2

// start the game
var factory = setInterval(spamRedCar, 2000);
var game = setInterval(moveCars, speed);


// move the orange car when you press a key
body.addEventListener('keypress', moveCar);

// move the red cars forward
function moveCars() {
	// position and lane for the orange car
	var carOrangeFront = parseInt(carOrange.style.top) - 80;
	var carOrangeLane = carOrange.style.left;

	// move the cars
	for (var i=0; i<cars.length; i++) {
		// move the cars
		var newCarTop = (parseInt(cars[i].style.top) + 10) + "px";
		cars[i].style.top = newCarTop;

		// check cars
		var carRedFront = parseInt(cars[i].style.top);
		var carRedLane = cars[i].style.left;

		// remove passing cars
		if(carRedFront >= carOrangeFront + 80) {
			body.removeChild(cars[i]);
			cars.splice(i, 1);

			// add points
			points++;
			msgPoints.innerHTML = points + " cars avoided";
		}

		// check collisions
		if(carRedFront >= carOrangeFront && carOrangeLane == carRedLane) {
			// stop the game
			clearInterval(game);
			clearInterval(factory);

			// let you know about the crash
			message.innerHTML = "Game Over";
		}
	}
}

// create a new red car
function spamRedCar() {
	// create a new car
	var img = new Image();
	img.src = "red.png";

	// position the car on the screen
	img.style.height = "80px"
	img.style.position = "absolute";
	img.style.top = "-80px";

	// get a random lane
	var lane = Math.floor(Math.random() * 3) + 1;
	if(lane == 1) img.style.left = "60px";
	if(lane == 2) img.style.left = "130px"; 
	if(lane == 3) img.style.left = "200px"; 

	// add the car to the cars array 
	cars.push(img);

	// add the car to the screen
	body.appendChild(img);
}

// move the car from lane to lane
function moveCar(e) {
	// get the current car's lane
	// lane #1: 60px
	// lane #2: 130px
	// lane #3: 200px
	var lane = carOrange.style.left;

	if (e.key == 'a' && lane == '200px') carOrange.style.left = '130px';
	if (e.key == 'a' && lane == '130px') carOrange.style.left = '60px';
	if (e.key == 'd' && lane == '60px') carOrange.style.left = '130px';
	if (e.key == 'd' && lane == '130px') carOrange.style.left = '200px';
}