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

      @bullets = new Bullets()
          
      @player = new Player()
      @player.scale(0.5, 0.5, 0.5)
      @player.y = 0.5
      @scene.addChild(@player)

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
        #cam.lookAt(@player)
        cam.centerX = @player.x + @player.rotation[8] * 2
        cam.centerY = 0.5
        cam.centerZ = @player.z + @player.rotation[10] * 2
        cam.chase(@player, -15, 10)
        cam.y = 5

      return
    @start()

window.onload = ->
  new Sample_Doga

