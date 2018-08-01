// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

var ship;
var asteroids = [];
var stars = [];
var lasers = [];
var score  = 0;

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (var i = 0; i < 10; i++) 
	{
		asteroids.push(new Asteroid());
	}
	for(var i=0;i<1000;i++)
	{
		stars.push(new star());
	}
}

function draw() {
	background(0);
	textSize(60);
	fill(255);
	for(var i=0;i<500;i++)
		stars[i].show();
	fill(255,0,0);
	text("Score : "+score, 50,50);

	for (var i = 0; i < asteroids.length; i++) 
	{
		if (ship.hits(asteroids[i])) 
		{
			var strr = 'Gameover!!!';
			textSize(60);
			fill(255,0,0);
			text(strr, windowWidth/2, windowHeight/2);

	  // console.log('ooops');

	  noLoop();
	}
	asteroids[i].render();
	asteroids[i].update();
	asteroids[i].edges();
}

for (var i = lasers.length - 1; i >= 0; i--) {
	lasers[i].render();
	lasers[i].update();
	if (lasers[i].offscreen()) {
		lasers.splice(i, 1);
	} else {
		for (var j = asteroids.length - 1; j >= 0; j--) {
			if (lasers[i].hits(asteroids[j])) {

				score++;

				if (asteroids[j].r > 10) {
					var newAsteroids = asteroids[j].breakup();
					asteroids = asteroids.concat(newAsteroids);
				}
				asteroids.splice(j, 1);
				lasers.splice(i, 1);
				break;
			}
		}
	}
}

console.log(lasers.length);

ship.render();
ship.turn();
ship.update();
ship.edges();


}

function keyReleased() {
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
	if (key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading));
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true);
	}
}
