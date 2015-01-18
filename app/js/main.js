'use strict';

// Global game instance.
var gGame = null;

// Global menu instance.
var gMenu = null

// Main animation handle.
var gHandleId = 0;

// Global graphics instance.
var gGraphics = null;

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
    'canvas',
    'menu',
    'controls',
    '../external/node_modules/mousetrap/mousetrap'
], function() {
    function startItem(n) {
        return {
            text: 'Start new game ' + n + 'P',
            func: function() { startGame(n); }
        }
    }
    gMenu = new Menu([
        startItem(2),
        startItem(3),
        startItem(4)
    ]);

    window.addEventListener('keydown', function (e) {
        var key = KEYS[e.keyCode];
        if (!key) {
            return;
        }
        e.preventDefault();
        if (gMenu !== null) {
            gMenu.keyDown(key);
        }
        return false;
    }, false);

    gGraphics = new CanvasUI();

    start();
});

function start() {
    if (gHandleId !== 0) {
        return;
    }
    function runFrame(time) {
        gHandleId = window.requestAnimationFrame(runFrame);
        gGraphics.draw(time);
    }
    window.requestAnimationFrame(runFrame);
}

function stop() {
    if (gHandleId === 0) {
        return;
    }
    window.cancelAnimationFrame(gHandleId);
    gHandleId = 0;
}

function startGame(numPlayers) {
    var game = new Game();
    game.createIslands(6, 4);
    game.createPlayers(numPlayers);
    bindControls(game);
    gGame = game;
    gMenu = null;
}
