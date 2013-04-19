Array.prototype.pushUnique = function (obj, equalityFunction) {
  equalityFunction  = (typeof equalityFunction === "undefined") ? function(a, b) { return a === b } : equalityFunction;
  for(var n = 0; n < this.length; n++) {
    if(equalityFunction(this[n], obj)) { // contains
      return false;
    }
  }
  this.push(obj);
  return true;
}
