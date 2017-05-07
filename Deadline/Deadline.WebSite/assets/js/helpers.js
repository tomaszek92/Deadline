Array.prototype.last = function() {
    return this[this.length - 1];
}

Array.prototype.removeById = function(id) {
    for (let index = 0; index < this.length; index++) {
        if (this[index].id === id) {
            this.splice(index, 1);
            console.log(index);
            break;
        }
    }
}