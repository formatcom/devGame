(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var _pointCollision = {}


  var stage = new DEVGAME.Container()
  stage.setContext(context)


  var rect = new DEVGAME.entity.Rect(0, canvas.clientHeight/2, 24, 24)

  rect.direction = +1
  rect.hspeed    = 0.2

  rect.logic = function(){

    
    if (this.x > (canvas.clientWidth - this.width) || (this.x < 0)){
      this.direction *= -1
    }

    this.x += this.hspeed*deltaTime*this.direction

    if (DEVGAME.collision.rectToCircle(this, circle)){
      
      
      _pointCollision.aX = this.getX()
      _pointCollision.bX = circle.getX()
      _pointCollision.aY = this.getY()
      _pointCollision.bY = circle.getY()

      this.color = circle.color = '#F00'
    }else{
      this.color = circle.color = '#000'
    }
  }

  var circle = new DEVGAME.entity.Circle(canvas.clientWidth-24, (canvas.clientHeight/2)+12, 12)

  circle.direction = -1
  circle.hspeed    = 0.1115

  circle.logic = function(){
    
    if (this.x > (canvas.clientWidth - this.radius) || (this.x < 0)){
      this.direction *= -1
    }

    this.x += this.hspeed*deltaTime*this.direction
  }

  stage.addChild(rect, circle)

  function loop(timestamp){

    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    //debug refresh
    if (_seg >= debugRefresh){
      
      _fps = (1/deltaTime)*1000
      _seg = 0
    }
    
    if (deltaTime > 17){
      deltaTime = 0
    }


    //clear canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
    stage.exec()
    stage.render()
    
    
    //draw fps
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'FPS: '+ _fps, 10, 20 )
    context.fillText( 'POINT COLLISION', 10, 40 )
    context.fillText( '  Rectangle' , 10, 60)
    context.fillText( '    x: ' + _pointCollision.aX, 10, 80)
    context.fillText( '    y: ' + _pointCollision.aY, 10, 100)
    context.fillText( '  Circle' , 10, 120)
    context.fillText( '    x: ' + _pointCollision.bX, 10, 140)
    context.fillText( '    y: ' + _pointCollision.bY, 10, 160)

    exec(loop)

  }

  var exec = DEVGAME.requestAnimationFrame(loop)

  exec(loop)

})(window, document, DEVGAME)
