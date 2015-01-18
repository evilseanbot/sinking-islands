'use strict';

// Canvas graphics implementation

var COLORS = {
	menu_bkg: '#000000',
	menu_item: '#AAAAAA',
	menu_sel: '#FFFFAA',

	water: '#09374F',
	island: '#E3CC86',

	p0: {
		sel: '#FF2600'
	},
	p1: {
		sel: '#527DFF'
	},
	p2: {
		sel: '#FFC900'
	},
	p3: {
		sel: '#00A115'
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

    function islandLoc(island) {
        var loc = island.location;
        return [(loc[0] * 0.75 + 1) * (width / 2),
                (-loc[1] * 0.75 + 1) * (height / 2)];
    }

	var clocs = {};
    for (i = 0; i < game.players.length; i++) {
        var player = game.players[i];
		var island = player.cursor.island;
        var loc = islandLoc(island);
		var cnum = clocs[island.index];
		if (cnum === undefined) {
			cnum = 0;
		}
		clocs[island.index] = cnum + 1;
        cxt.strokeStyle = COLORS['p' + i].sel;
		cxt.lineWidth = 3.0;
        cxt.beginPath();
        cxt.arc(loc[0], loc[1], sz * (1.1 + 0.1 * cnum),
				0, Math.PI*2, true);
        cxt.stroke();
    }

    for (i = 0; i < game.islands.length; i++) {
        var island = game.islands[i];
        var loc = islandLoc(island);
        cxt.fillStyle = '#E3CC86';
        cxt.beginPath();
        cxt.arc(loc[0], loc[1], sz, 0, Math.PI*2, true);
        cxt.fill();
    }
}

CanvasUI.prototype.draw = function(time) {
    if (gMenu !== null) {
        this.drawMenu(time, gMenu);
    } else if (gGame !== null) {
        this.drawGame(time, gGame);
    }
}
