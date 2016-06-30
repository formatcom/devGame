// Generated by CoffeeScript 1.10.0
(function() {
  var Sprite;

  Sprite = function(options) {
    this.source = options.source;
    this.spritesheet = new Image();
    this.spritesheet.src = this.source;
    this.animations = options.animations;
    this.width = 0;
    this.height = 0;
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.swidth = options.swidth;
    this.sheight = options.sheight;
    this.fps = options.fps || 0;
    this.animation = options.animation;
    this._interval = 1000 / this.fps;
    this._timestamp = +(new Date);
    this._timeelapse = this._timestamp;
    this._deltatime = 0;
    this._frame = 0;
    return this._play = 1;
  };

  Sprite.prototype.use = function(animation) {
    if (this.animation !== animation) {
      this.animation = animation;
      return this._timeelapse = 0;
    }
  };

  Sprite.prototype.frame = function(n) {
    if (this.animations[this.animation][n]) {
      this._frame = n;
    }
    return this._timeelapse = 0;
  };

  Sprite.prototype.play = function() {
    return this._play = 1;
  };

  Sprite.prototype.stop = function() {
    this._frame = 0;
    return this._play = 0;
  };

  Sprite.prototype.pause = function() {
    return this._play = 2;
  };

  Sprite.prototype.next = function() {
    if ((this._frame + 1) < this.animations[this.animation].length) {
      return this._frame = ++this._frame;
    }
  };

  Sprite.prototype.preview = function() {
    if (this._frame > 0) {
      return this._frame = --this._frame;
    }
  };

  Sprite.prototype.load = function(callback) {
    var self;
    self = this;
    this.spritesheet.onload = function() {
      self.width = this.width;
      self.height = this.height;
      return callback.call(self, null);
    };
    return this.spritesheet.onerror = function(event) {
      return callback.call(self, event);
    };
  };

  Sprite.prototype.get = function() {
    return this.spritesheet;
  };

  Sprite.prototype.exec = function() {
    var frame;
    this._timestamp = +(new Date);
    this._deltatime = this._timestamp - this._timeelapse;
    if (this._deltatime > this._interval) {
      if (this._play === 1) {
        this._frame = ++this._frame % this.animations[this.animation].length;
      }
      frame = this.animations[this.animation][this._frame];
      this.sx = frame.sx;
      this.sy = frame.sy;
      return this._timeelapse = this._timestamp - (this._deltatime % this._interval);
    }
  };

  module.exports = Sprite;

}).call(this);
