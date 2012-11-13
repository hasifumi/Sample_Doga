class Bullet extends Sphere
  constructor:()->
    @game = enchant.Game.instance
    super(0.2)
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
    for i in [0...10]
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
        i.rotation = @game.player.rotation
        return i
