var x = 0;
var y = 0;

function printLocation(mapX, mapY) {
	console.log("At X:" + mapX + " Y:" + mapY);
}

Mousetrap.bind('s', function() {
	if (y < 5) {
		y++;
		printLocation(x, y);
	} else {
		console.log("AT EDGE OF MAP DINGBAT");
	}
});

Mousetrap.bind('a', function() {
	if (x > 0) {
		x--;
		printLocation(x, y);
	} else {
		console.log("AT EDGE OF MAP DINGBAT");
	}
});

Mousetrap.bind('w', function() {
	if (y > 0) {
		y--;
		printLocation(x, y);
	} else {
		console.log("AT EDGE OF MAP DINGBAT");
	}
});

Mousetrap.bind('d', function() {
	if (x < 5) {
		x++;
		printLocation(x, y);
	} else {
		console.log("AT EDGE OF MAP DINGBAT");
	}
});

