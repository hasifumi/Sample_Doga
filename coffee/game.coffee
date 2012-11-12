enchant()
class Sample_Doga extends Game
  constructor:->
    super()
    @keybind("Z".charCodeAt(0), "a")
    @preload "image/grand_sample_tex.jpg", "model/boss3.l3c.js"
    @onload = ->
      @scene = new Scene3D()
      cam = @scene.getCamera()
      cam.x = 0
      cam.y = 10
      cam.z = -20

      @bullets = []
      bo = new Sphere(0.2)
      bo.mesh.setBaseColor([1, 1, 0, 1])
      bo.mesh.texture.ambient = [1, 1, 1, 1]
      bo.mesh.texture.diffuse = [0, 0, 0, 1]
      for i in [0...10]
        b = bo.clone()
        b.on("removed", ->
          @active = false
        )
        b.onenterframe = ->
          @forward(0.6)
          if @age > 100
            @parentNode.removeChild(@)
        b.active = false
        @bullets.push(b)
      @bullets.get = =>
        for i in @bullets
          if i.active isnt true
            i.active = true
            i.age = 0
            i.x = player.x
            i.y = player.y
            i.z = player.z
            i.rotation = player.rotation
            return i
          
      player = new Player()
      player.scale(0.5, 0.5, 0.5)
      player.y = 0.5
      @scene.addChild(player)

      @timer = new Node()
      @rootScene.addChild @timer

      ground = new PlaneXZ(40)
      (=>
        tex = ground.mesh.texture
        tex.specular = [0, 0, 0, 1]
        tex.src = @assets["image/grand_sample_tex.jpg"]
      )()
      @scene.addChild(ground)

      @onenterframe = ->
        #cam.lookAt(player)
        cam.centerX = player.x + player.rotation[8] * 2
        cam.centerY = 0.5
        cam.centerZ = player.z + player.rotation[10] * 2
        cam.chase(player, -15, 10)
        cam.y = 5

      return
    @start()

window.onload = ->
  new Sample_Doga

