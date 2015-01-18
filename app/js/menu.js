// A menu, where the user can select items.

function Menu(items) {
    this.items = items;
    this.selection = 0;
}

Menu.prototype.keyDown = function(key) {
    if (key == 'up') {
        this.selection--;
        if (this.selection < 0) {
            this.selection = this.items.length - 1;
        }
        return false;
    } else if (key == 'down') {
        this.selection++;
        if (this.selection >= this.items.length) {
            this.selection = 0;
        }
        return false;
    } else if (key == 'enter') {
        this.items[this.selection].func();
        return false;
    }
}
