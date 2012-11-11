class Player extends Entity
  constructor:()->
    @game = enchant.Game.instance
    super()
    #@ = @game.assets["model/boss3.l3c.js"]
    #@onenterframe = ->
    #  if @game.input.up
    #    @forward(0.3)
    #  else
    #    if @game.input.down
    #      @forward(-0.2)
    #  if @game.input.left
    #    @rotateYaw(0.1)
    #  else
    #    if @game.input.right
    #      @rotateYaw(-0.1)
