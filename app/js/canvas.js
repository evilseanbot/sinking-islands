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
    var cxt = this.cxt;

    cxt.fillStyle = '#ff0000';
    cxt.fillRect(0, 0, this.width, this.height);
}

CanvasUI.prototype.draw = function(time) {
    if (gMenu !== null) {
        this.drawMenu(time, gMenu);
    } else if (gGame !== null) {
        this.drawGame(time, gGame);
    }
}
