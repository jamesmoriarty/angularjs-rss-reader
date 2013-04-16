Array.prototype.pushUnique = function (obj) {
  if(this.indexOf(obj) == -1) {
    this.push(obj);
    return true;
  }
  return false;
}

Array.prototype.pushUniqueBy = function (obj, equalityFunction) {
  for(var n = 0; n < this.length; n++) {
    if(equalityFunction(this[n], obj)) { // contains
      return false;
    }
  }
  this.push(obj);
  return true;
}
