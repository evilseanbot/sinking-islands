// List of all directions.
var DIRECTIONS = ['up', 'down', 'right', 'left'];

var OPPOSITE_DIRECTION = {
    'up': 'down',
    'down': 'up',
    'right': 'left',
    'left': 'right'
}

// List of all orders that can be given to islands.
var ORDERS = ['move_up', 'move_down', 'move_right', 'move_left',
              'build_building', 'build_unit'];

// Convert (x, y) coordinates to a string.
function point(x, y) {
    return '' + x + ',' + y;
}

// The game state.
function Game() {
    // List of all islands in the game.
    this.islands = null;
    // List of all players in the game.
    this.players = null;
}

// Create a grid of islands.
Game.prototype.createIslands = function(width, height) {
    var x, y;
    var islands = [];
    var locs = {};
    if (width < 2) {
        width = 2;
    }
    if (height < 2) {
        height = 2;
    }
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            var island = new Island(
                islands.length,
                -1 + 2 * x / (width - 1),
                -1 + 2 * y / (height - 1));
            locs[point(x, y)] = island;
            islands.push(island);
        }
    }
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            var island = locs[point(x, y)];
            if (y < height - 1) {
                island.connect(locs[point(x,y+1)], 'up');
            }
            if (x < width - 1) {
                island.connect(locs[point(x+1,y)], 'right');
            }
        }
    }
    this.islands = islands;
}

// Create the players.
// depends on createIslands being called first.
Game.prototype.createPlayers = function(numPlayers) {
    var i;
    this.players = [];
    for (i = 0; i < numPlayers; i++) {
        this.players.push(new Player(i));
        this.players[i].cursor.island = this.islands[0];

    }
}

// Player class.
function Player(index) {
    // Unique identifier for the player (0..N-1).
    this.index = index;
    // Island that the player's cursor is pointing at.
    this.cursor = new Cursor();

    // Number of rocket parts that the player has (0..100).
    // Reaching 100 wins the game.
    this.rocketParts = 0;
}

// Island class.
function Island(index, x, y) {
    // Unique identifier for the island (0..N-1).
    this.index = index;
    // (x, y) visual location on the map, in the range -1..+1.
    this.location = [x, y];
    // The island's owner (0..N), or -1 if nobody owns it.
    this.owner = -1;
    // The number of units (people) on this island.
    this.unitCount = 0;
    // The height of the buildings on this island (0..5).
    this.buildingLevel = 0;
    // The current orders for this island.
    this.orders = null;
    // The island's neighboring islands.
    this.neighbors = {up:null, down:null, right:null, left:null};
    // The current defensive health of this island (0..100).
    // When this reaches 0, a unit or building on the island is destroyed,
    // and defense resets to 100.
    this.defense = 100;
    // How close the island is to sinking (0..100).  When this reaches 0, the
    // island sinks into the void.
    this.sinkCounter = 100;
}

Island.prototype.connect = function(other, dir) {
    var dir2 = OPPOSITE_DIRECTION[dir];
    if (this.neighbors[dir] !== null || other.neighbors[dir] !== null) {
        console.log("Cannot connect islands.");
        return;
    }
    this.neighbors[dir] = other;
    other.neighbors[dir2] = this;
}

Island.prototype.update = function() {
    
}
