// List of all directions.
var DIRECTIONS = ['north', 'south', 'east', 'west'];

// List of all orders that can be given to islands.
var ORDERS = ['move_north', 'move_south', 'move_east', 'move_west',
              'build_building', 'build_unit'];

// Island class
function Island(x, y) {
    // (x, y) location on the map
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
    this.neighbors = {north:null, south:null, east:null, west:null};
    // The current defensive health of this island (0..100).
    // When this reaches 0, a unit or building on the island is destroyed,
    // and defense resets to 100.
    this.defense = 100;
    // How close the island is to sinking (0..100).  When this reaches 0, the
    // island sinks into the void.
    this.sinkCounter = 100;
}

Island.prototype.update = function() {
    
}
