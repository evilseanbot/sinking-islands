// Canvas UI

function CanvasUI() {
    var width = Math.max(window.innerWidth, 512);
    var height = Math.round(width * 9 / 16);
    this.canvas = document.createElement('canvas');
    this.cxt = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.frametime = 0;
    this.handleId = 0;
    this.width = width;
    this.height = height;
    this.screen = new MenuScreen([
        {
            text: 'Start new game 2P',
            func: function() { startGame(2); }
        },
        {
            text: 'Start new game 3P',
            func: function() { startGame(3); }
        },
        {
            text: 'Start new game 4P',
            func: function() { startGame(4); }
        }
    ]);
    document.body.appendChild(this.canvas);
}

// Start the UI, displaying game state to the screen.
CanvasUI.prototype.start = function() {
    if (this.handleId !== 0) {
        return;
    }
    this.frametime = Date.now();
    (function(ui) {
        function func(time) {
            ui.handleId = window.requestAnimationFrame(func);
            ui.screen.runFrame(ui.cxt, ui.width, ui.height, time);
        }
        ui.handleId = window.requestAnimationFrame(func);
    })(ui);
}

// Stop the UI.
CanvasUI.prototype.stop = function() {
    if (this.handleId === 0) {
        return;
    }
    window.cancelAnimationFrame(this.handleId);
    this.handleId = 0;
}

// Main menu screen.

function MenuScreen(items) {
    this.items = items;
    this.selection = 0;
}

MenuScreen.prototype.runFrame = function(cxt, width, height, time) {
    cxt.fillStyle = 'rgb(0, 0, 0)';
    cxt.fillRect(0, 0, width, height);

    cxt.font = '48px Sans-Serif';
    cxt.fillStyle = 'rgb(200, 200, 200)';
    for (var i = 0; i < this.items.length; i++) {
        if (i == this.selection) {
            cxt.fillStyle = '#ffffaa';
            cxt.fillText('>', 20, 60 + 60 * i);
        } else {
            cxt.fillStyle = '#aaaaaa';
        }
        cxt.fillText(this.items[i].text, 60, 60 + 60*i);
    }
}

MenuScreen.prototype.keyDown = function(key) {
    if (key == 'up') {
        this.selection--;
        if (this.selection < 0) {
            this.selection = this.items.length - 1;
        }
    } else if (key == 'down') {
        this.selection++;
        if (this.selection >= this.items.length) {
            this.selection = 0;
        }
    }
}
