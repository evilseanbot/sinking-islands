'use strict';

// Canvas graphics implementation

var COLORS = {
	menu_bkg: '#000000',
	menu_item: '#AAAAAA',
	menu_sel: '#FFFFAA',

	water: '#09374F',
	island: '#E3CC86',

	p0: {
		sel: 'hsl(  9,100%, 50%)',
		b1:  'hsl(  9, 50%, 50%)',
		b2:  'hsl(  9, 20%, 50%)'
	},
	p1: {
		sel: 'hsl(225,100%, 66%)',
		b1:  'hsl(225, 50%, 66%)',
		b2:  'hsl(225, 20%, 66%)'
	},
	p2: {
		sel: 'hsl(128,100%, 32%)',
		b1:  'hsl(128, 50%, 32%)',
		b2:  'hsl(128, 20%, 32%)'
	},
	p3: {
		sel: 'hsl( 47,100%, 50%)',
		b1:  'hsl( 47, 50%, 50%)',
		b2:  'hsl( 47, 20%, 50%)'
	}
};

function CanvasUI() {
    var width = Math.max(window.innerWidth, 512);
    var height = Math.round(width * 9 / 16);
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.cxt = canvas.getContext('2d');
    this.width = width;
    this.height = height;
}

CanvasUI.prototype.drawMenu = function(time, menu) {
    var cxt = this.cxt;

    cxt.fillStyle = COLORS.menu_bkg;
    cxt.fillRect(0, 0, this.width, this.height);

    cxt.font = '48px Sans-Serif';
    for (var i = 0; i < menu.items.length; i++) {
        if (i == menu.selection) {
            cxt.fillStyle = COLORS.menu_sel;
            cxt.fillText('>', 20, 60 + 60 * i);
        } else {
            cxt.fillStyle = COLORS.menu_item;
        }
        cxt.fillText(menu.items[i].text, 60, 60 + 60*i);
    }
}

CanvasUI.prototype.drawGame = function(time, game) {
    var i;
    var cxt = this.cxt;
    var width = this.width, height = this.height;
    var sz = width * 0.05;

    cxt.fillStyle = COLORS.water;
    cxt.fillRect(0, 0, this.width, this.height);

    function enterIsland(island) {
        var loc = island.location;
        cxt.translate((loc[0] * 0.75 + 1) * (width / 2),
					  (-loc[1] * 0.75 + 1) * (height / 2));
    }

	var clocs = {};
    for (i = 0; i < game.players.length; i++) {
        var player = game.players[i];
		var island = player.cursor.island;
		cxt.save();
		enterIsland(island);
		var cnum = clocs[island.index];
		if (cnum === undefined) {
			cnum = 0;
		}
		clocs[island.index] = cnum + 1;
        cxt.strokeStyle = COLORS['p' + i].sel;
		cxt.lineWidth = 3.0;
        cxt.beginPath();
        cxt.arc(0, 0, sz * (1.1 + 0.1 * cnum),
				0, Math.PI*2, true);
        cxt.stroke();
		cxt.restore();
    }

    for (i = 0; i < game.islands.length; i++) {
        var island = game.islands[i];
		cxt.save();
		enterIsland(island);
        cxt.fillStyle = COLORS.island;
        cxt.beginPath();
        cxt.arc(0, 0, sz, 0, Math.PI*2, true);
        cxt.fill();
		if (island.owner >= 0) {
			var col = COLORS['p' + island.owner];
			var j;
			if (island.buildingLevel > 0) {
				cxt.fillStyle = col.b2;
				cxt.strokeStyle = col.b1;
				cxt.lineWidth = 3.0;
				cxt.beginPath();
				for (j = 0; j < island.buildingLevel; j++) {
					cxt.rect(-20, -10, 40, 20);
				}
				cxt.fill();
				cxt.stroke();
			}
		}
		cxt.restore();
    }
}

CanvasUI.prototype.draw = function(time) {
    if (gMenu !== null) {
        this.drawMenu(time, gMenu);
    } else if (gGame !== null) {
        this.drawGame(time, gGame);
    }
}
