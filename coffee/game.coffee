enchant()
class Sample_Doga extends Game
  constructor:->
    super()
    @preload "image/grand_sample_tex.jpg", "model/boss3.l3c.js"
    @onload = ->
      scene = new Scene3D()
      cam = scene.getCamera()
      cam.x = 0
      cam.y = 10
      cam.z = -20

      #player = new Player()
      player = @assets["model/boss3.l3c.js"]
      player.scale(0.5, 0.5, 0.5)
      player.y = 0.5
      player.walking = false
      player.onenterframe = =>
        if @input.up
          player.forward(0.3)
          player.walking = true
        else
          if @input.down
            player.forward(-0.3)
            player.walking = true
          else
            player.walking = false
        if @input.left
          player.rotateYaw(0.1)
        else
          if @input.right
            player.rotateYaw(-0.1)
        if player.walking
          if player.age %  10 is 0
            player.animate("Pose3", 5)
          else
            if player.age % 10 is 5
              player.animate("Pose4", 5)
        else
          player.animate("_initialPose", 5)

      scene.addChild(player)

      ground = new PlaneXZ(40)
      (=>
        tex = ground.mesh.texture
        tex.specular = [0, 0, 0, 1]
        tex.src = @assets["image/grand_sample_tex.jpg"]
      )()
      scene.addChild(ground)

      @onenterframe = ->
        #cam.lookAt(player)
        cam.centerX = player.x + player.rotation[8]*5
        cam.centerY = 0.5
        cam.centerZ = player.z + player.rotation[10]*5
        cam.chase(player, -10, 10)
        cam.y = 5

      return
    @start()

window.onload = ->
  new Sample_Doga

