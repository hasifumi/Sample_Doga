class Ground extends PlaneXZ
  constructor:(count)->
    @game = enchant.Game.instance
    super(count)
    tex = @mesh.texture
    tex.specular = [0, 0, 0, 1]
    tex.src = @game.assets["image/grand_sample_tex.jpg"]
