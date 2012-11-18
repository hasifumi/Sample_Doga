class Explosion extends Sphere
  constructor:(bullet, scale)->
    @game = enchant.Game.instance
    super(0.5)
    #console.log "add Explosion"
    tex = @mesh.texture
    tex.ambient = [1, 1, 1, 1]
    tex.diffuse = [0, 0, 0, 1]
    tex.specular = [0, 0, 0, 1]
    #@mesh.setBaseColor([1, 1, 0, 1])
    tex.src = @game.assets["image/explosion.jpeg"]
    @x = bullet.x
    @y = bullet.y
    @z = bullet.z
    @onenterframe = =>
      @scale(scale, scale, scale)
      if @age > 10
        @parentNode.removeChild(@)
