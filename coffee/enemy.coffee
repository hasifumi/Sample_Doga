class Enemy extends Sprite3D
  constructor:()->
    @game = enchant.Game.instance
    super()
    @model = @game.assets["model/robo4.l3p.js"]
    @addChild @model
    @hp = 5

    @active = false
    @onenterframe = =>
      #if @age > 100
      #  @parentNode.removeChild(@)
      if @age % 60 < 30
        @game.timer.tl.clear()
        @forward(0.2)
      else
        if @age % 60 is 40
          tt = Math.atan2(@game.player.x - @x, @game.player.z - @z)
          tf = Math.atan2(@rotation[8], @rotation[10])
          self = @
          @game.timer.tl.clear().then(->
            self.rotationApply(new Quat(0, 1, 0, (tt - tf) / 20))
          ).delay(2).loop()
    @on("removed", =>
      @active = false
    )
  damage:=>
    @hp -= 1
    console.log "enemy damaged!"
    if @hp <= 0
      if @parentNode
        @parentNode.removeChild(@)

class Enemies
  constructor:->
    @game = enchant.Game.instance
    @ary = []
    for i in [0...5]
      b = new Enemy()
      @ary.push b
    #return ary
  get: =>
    for i in @ary
      if i.active isnt true
        i.active = true
        i.age = 0
        return i
