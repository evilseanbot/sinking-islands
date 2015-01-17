// Global UI instance.
var ui = null;

require([
    'game',
    'canvas'
], function() {
    ui = new CanvasUI();
    ui.start();
})
