class Bullet extends Sphere
  constructor:()->
    @game = enchant.Game.instance
    super(0.2)
    @scaleX = 0.5
    @scaleY = 0.5
    @scaleZ = 2.0
    @mesh.setBaseColor([1, 1, 0, 1])
    @mesh.texture.ambient = [1, 1, 1, 1]
    @mesh.texture.diffuse = [0, 0, 0, 1]
    @active = false
    @onenterframe = =>
      @forward(0.6)
      if @age > 100
        @parentNode.removeChild(@)
    @on("removed", =>
      @active = false
    )

class Bullets
  constructor:->
    @game = enchant.Game.instance
    @ary = []
    for i in [0...20]
      b = new Bullet()
      @ary.push b
  get:=>
    for i in @ary
      if i.active isnt true
        i.active = true
        i.age = 0
        i.x = @game.player.x
        i.y = @game.player.y
        i.z = @game.player.z
        brot = mat4.create()
        num = [0..15]
        for i in num
          console.log "i:"+i
          brot[i] = @game.player.rotation[i]
        i.rotation = brot
        #i.rotation = @game.player.rotation
        i.rotateYaw(Math.random() * 0.2 - 0.1)
        return i
