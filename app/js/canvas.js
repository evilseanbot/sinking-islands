'use strict';

// Canvas graphics implementation

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

    cxt.fillStyle = 'rgb(0, 0, 0)';
    cxt.fillRect(0, 0, this.width, this.height);

    cxt.font = '48px Sans-Serif';
    cxt.fillStyle = 'rgb(200, 200, 200)';
    for (var i = 0; i < menu.items.length; i++) {
        if (i == menu.selection) {
            cxt.fillStyle = '#ffffaa';
            cxt.fillText('>', 20, 60 + 60 * i);
        } else {
            cxt.fillStyle = '#aaaaaa';
        }
        cxt.fillText(menu.items[i].text, 60, 60 + 60*i);
    }
}

CanvasUI.prototype.drawGame = function(time, game) {
    var i;
    var cxt = this.cxt;
    var width = this.width, height = this.height;
    var sz = width * 0.05;

    cxt.fillStyle = '#869DE3';
    cxt.fillRect(0, 0, this.width, this.height);

    function islandLoc(island) {
        var loc = island.location;
        return [(loc[0] * 0.75 + 1) * (width / 2),
                (-loc[1] * 0.75 + 1) * (height / 2)];
    }

    for (i = 0; i < game.players.length; i++) {
        var player = game.players[i];
        var loc = islandLoc(player.cursor.island);
        cxt.strokeStyle = '#ff00000'
        cxt.beginPath();
        cxt.arc(loc[0], loc[1], sz * 1.1, 0, Math.PI*2, true);
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
