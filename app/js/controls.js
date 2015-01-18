var controllerCounter = 0;

function Cursor() {
	this.cursorNum = controllerCounter;
	controllerCounter++;
	this.island = null;
}

Cursor.prototype.move = function(direction) {
	if (this.island.neighbors[direction] != null) {
		this.island = this.island.neighbors[direction];
		console.log("Moved cursor " + this.cursorNum + " " + direction);
		console.log('cursor now at island' + this.island.index);
		console.log('island coordinates' + this.island.location);
		console.log(game);
	} else {
		console.log("cant move in that direction");
	}
}

function bindControls() {
	var controlMap = {
		w: {
	        button: 'w',
	        player: 0,
	        direction: 'up'
		}, s: {
	        button: 's',
	        player: 0,
	        direction: 'down'		
		}, a: {
	        button: 'a',
	        player: 0,
	        direction: 'left'		
		}, d: {
	        button: 'd',
	        player: 0,
	        direction: 'right'		
		},

		t: {
	        button: 't',
	        player: 1,
	        direction: 'up'
		}, g: {
	        button: 'g',
	        player: 1,
	        direction: 'down'		
		}, f: {
	        button: 'f',
	        player: 1,
	        direction: 'left'		
		}, h: {
	        button: 'h',
	        player: 1,
	        direction: 'right'		
		},

		i: {
	        button: 'i',
	        player: 2,
	        direction: 'up'
		}, k: {
	        button: 'k',
	        player: 2,
	        direction: 'down'		
		}, j: {
	        button: 'j',
	        player: 2,
	        direction: 'left'		
		}, l: {
	        button: 'l',
	        player: 2,
	        direction: 'right'		
		}
	};

	Object.keys(controlMap).forEach(function (entry) {
		var value = controlMap[entry];

	    if (value.player <= game.players.length) {
			Mousetrap.bind(value.button, function() {
				game.players[value.player].cursor.move(value.direction);
			});
		}
	});
}