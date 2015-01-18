// Global UI instance.
var ui = null;

var KEYS = {
    '40': 'down',
    '38': 'up',
    '39': 'right',
    '37': 'left',
    '13': 'enter',
    '32': 'enter',
    '27': 'esc'
}

require([
    'game',
    'canvas'
], function() {
    ui = new CanvasUI();
    addEventListener('keydown', function (e) {
        var key = KEYS[e.keyCode];
        if (key) {
            ui.screen.keyDown(key);
            return false;
        }
    }, false);
    ui.start();
})
