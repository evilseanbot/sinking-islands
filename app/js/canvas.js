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
            ui.runFrame(time);
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

// Display current frame to screen.
CanvasUI.prototype.runFrame = function(time) {
    console.log('draw: ' + time);
    var cxt = this.cxt;
    cxt.fillStyle = 'rgb(255, 0, 0)';
    cxt.fillRect(0, 0, this.width, this.height);
}
