var gameObjects = require('../_gameObjects').all();

module.exports = function(id, args){
   for (var index in gameObjects){
      var gameObject = gameObjects[index];
      if (typeof gameObject.listen[id] === 'function')
         gameObject.listen[id].apply(gameObject, args);
   }
};