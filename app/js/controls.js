'use strict';

//var controllerCounter = 0;

function Cursor() {
	//this.cursorNum = controllerCounter;
	//controllerCounter++;
	this.island = null;
}

Cursor.prototype.move = function(direction) {
	if (this.island.neighbors[direction] != null) {
		this.island = this.island.neighbors[direction];
		//console.log("Moved cursor " + this.cursorNum + " " + direction);
		//console.log('cursor now at island' + this.island.index);
		//console.log('island coordinates' + this.island.location);
	} else {
		//console.log("cant move in that direction");
	}
}

function bindControls(game) {
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
		},

		up: {
	        button: 'up',
	        player: 3,
	        direction: 'up'
		}, down: {
	        button: 'down',
	        player: 3,
	        direction: 'down'		
		}, left: {
	        button: 'left',
	        player: 3,
	        direction: 'left'		
		}, right: {
	        button: 'right',
	        player: 3,
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


	Mousetrap.bind('z', function(){ 
		game.players[0].mockAction1();
	});

	Mousetrap.bind('x', function(){ 
		game.players[0].mockAction2();
	});

	Mousetrap.bind('c', function(){ 
		game.players[0].mockAction3();
	});

	if (game.players.length > 1) {
		Mousetrap.bind('v', function(){ 
			game.players[1].mockAction1();
		});

		Mousetrap.bind('b', function(){ 
			game.players[1].mockAction2();
		});

		Mousetrap.bind('n', function(){ 
			game.players[1].mockAction3();
		});	
	}

	if (game.players.length > 2) {
		Mousetrap.bind('m', function(){ 
			game.players[2].mockAction1();
		});

		Mousetrap.bind(',', function(){ 
			game.players[2].mockAction2();
		});

		Mousetrap.bind('.', function(){ 
			game.players[2].mockAction3();
		});
	}

	if (game.players.length > 3) {
		Mousetrap.bind('1', function(){ 
			game.players[3].mockAction1();
		});

		Mousetrap.bind('2', function(){ 
			game.players[3].mockAction2();
		});

		Mousetrap.bind('3', function(){ 
			game.players[3].mockAction3();
		});	
	}

}