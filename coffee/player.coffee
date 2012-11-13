class Player extends Sprite3D
  constructor:()->
    @game = enchant.Game.instance
    super()
    @model = @game.assets["model/boss3.l3c.js"]
    @addChild @model
    @walking = false
    @heat = 0

    @onenterframe = =>
      @walking = false
      if @game.input.up
        @forward(0.3)
        @walking = true
      else
        if @game.input.down
          @forward(-0.2)
          @walking = true
      if @game.input.left
        @rotateYaw(0.1)
        @walking = true
      else
        if @game.input.right
          @rotateYaw(-0.1)
          @walking = true

      if @walking
        @game.timer.tl.then(=>
          @model.animate("Pose3", 10)
        ).delay(10).then(=>
          @model.animate("Pose4", 10)
        ).delay(10).loop()
      else
        @game.timer.tl.clear()

      if @game.input.a and @heat <= 0
        b = @game.bullets.get()
        if b
          @game.scene.addChild(b)
          @heat = 3
      @heat -= 1
