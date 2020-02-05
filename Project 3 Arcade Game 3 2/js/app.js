let gameScore = 0,
	lives = 3,
	livesLeft = document.querySelector('.livesLeft > span'),
	score = document.querySelector('.score > span');

// Enemies our player must avoid
class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = Math.floor(Math.random() * 200) + 400;
		this.sprite = 'images/enemy-bug.png';
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	// You should multiply any speed by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	update(dt) {
		this.x += this.speed * dt;
		livesLeft.innerText = lives;

		if (this.x > 500) {
			this.x = -100;
		}

		if (player.x < this.x + 70 &&
			player.x + 18 > this.x &&
			player.y < this.y + 12 &&
			15 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			lives--;
			livesLeft.innerText = lives;
			if (lives === 0) {
				prompt(`Game Over, Enter your name 😃`);
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '0';
			}
		}
	};
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/char-boy.png';
	}

	update() {
		if (this.y > 300) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 2) {
			this.x = 2;
		}
		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			gameScore++;
			score.innerText = gameScore * 10;
			if (gameScore === 300 && lives > 0) {
				alert('YAY! We got a winner! 🎊 🎉');
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '0';
			}
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

handleInput(inputKey) {
		switch (inputKey) {
			case 'left':
				this.x -= this.speed + 50;
				break;
			case 'up':
				this.y -= this.speed + 30;
				break;
			case 'right':
				this.x += this.speed + 50;
				break;
			case 'down':
				this.y += this.speed + 30;
				break;
		}
	}
}

let allEnemies = [];
let hitbug1 = new Enemy(-90, 220);
let hitbug2 = new Enemy(-10, 130);
let hitbug3 = new Enemy(-200, 50);
// let hitbug3 = new Enemy(-200, 40);

let player = new Player (200,400, 50);
allEnemies.push(hitbug1);
allEnemies.push(hitbug2);
allEnemies.push(hitbug3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
