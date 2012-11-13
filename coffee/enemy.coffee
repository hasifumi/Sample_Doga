class Enemy extends Sprite3D
  constructor:()->
    @game = enchant.Game.instance
    super()
    @model = @game.assets["model/robo4.l3p.js"]
    @addChild @model
    @walking = false

    @active = false
    @onenterframe = =>
      @forward(-0.3)
      if @age > 100
        @parentNode.removeChild(@)
    @on("removed", =>
      @active = false
    )

class Enemies
  constructor:->
    @game = enchant.Game.instance
    @ary = []
    for i in [0...20]
      b = new Enemy()
      @ary.push b
  get:=>
    for i in @ary
      if i.active isnt true
        i.active = true
        i.age = 0
        return i
