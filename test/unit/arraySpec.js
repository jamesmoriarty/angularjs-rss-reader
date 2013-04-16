/*global describe, it, beforeEach, inject, expect*/
(function () {
  'use strict';

  describe('Array#pushUnique', function () {
    it('having unique argument append argument', function () {
      var array = [1];
      array.pushUnique(2);
      expect(array).toEqual([1, 2]);
    });
    
    it('having unique argument return true', function () {
      expect([1].pushUnique(2)).toBe(true);
    });
    
    it('having not unique argument append argument', function () {
      var array = [1];
      array.pushUnique(1);
      expect(array).toEqual([1]);
    });

    it('having not unique argument return false', function () {
      expect([1].pushUnique(1)).toBe(false);
    });
  });

  describe('Array#pushUniqueBy', function () {
    
    var a, b, array, equalityFunction;
    beforeEach(inject(function ($controller, $rootScope) {
      a     = {value: 1}; 
      b     = {value: 2};
      array = [a];
      equalityFunction = function(a, b) { return a.value === b.value; }
    }));
    
    it('having unique argument append argument', function () {
      array.pushUniqueBy(b, equalityFunction);
      expect(array).toEqual([a, b]);
    });
    
    it('having unique argument return true', function () {
      expect(array.pushUniqueBy(b, equalityFunction)).toBe(true);
    });
    
    it('having not unique argument append argument', function () {
      array.pushUniqueBy(a, equalityFunction);
      expect(array).toEqual([a]);
    });

    it('having not unique argument return false', function () {
      expect(array.pushUniqueBy(a, equalityFunction)).toBe(false);
    });
  });

}());

