Array::pushUnique = (obj, equalityFunction) ->
  equalityFunction = equalityFunction or (a, b) ->
    a is b

  for obj2 in this
    return false if equalityFunction(obj, obj2)

  this.push obj
  return true
