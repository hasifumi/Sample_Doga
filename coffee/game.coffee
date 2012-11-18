enchant()
class Sample_Doga extends Game
  constructor:->
    super()
    @keybind("Z".charCodeAt(0), "a")
    @preload "image/grand_sample_tex.jpg", "model/boss3.l3c.js", "model/robo4.l3p.js", "image/explosion.jpeg"
    @onload = ->
      @scene = new Scene3D()
      cam = @scene.getCamera()
      cam.x = 0
      cam.y = 10
      cam.z = -20

      @bullets = new Bullets()
      @enemies = new Enemies()
      #console.log "@bullets.ary.length: "+@bullets.ary.length
      #console.log "@enemies.ary.length: "+@enemies.ary.length
          
      @player = new Player()
      @player.scale(0.5, 0.5, 0.5)
      @player.y = 0.5
      @scene.addChild(@player)

      #@timer = new Node()
      #@rootScene.addChild @timer

      ground = new PlaneXZ(40)
      (=>
        tex = ground.mesh.texture
        tex.specular = [0, 0, 0, 1]
        tex.src = @assets["image/grand_sample_tex.jpg"]
      )()
      @scene.addChild(ground)

      @onenterframe = =>
        if @frame % 100 is 0
          e = @enemies.get()
          if e
            e.x = Math.random() * 80 - 40
            #e.x = @player.x
            e.y = 0.5
            e.z = Math.random() * 80 - 40
            #e.z = @player.z
            @scene.addChild(e)
          #console.log "enemy add  e.hp:"+e.hp

        for b in @bullets.ary
          if b.active
            for e in @enemies.ary
              if e.active
                if b.intersect(e)
                  if b.parentNode
                    b.parentNode.removeChild(b)
                  e.damage()
                  exp = new Explosion(b, 1,3)
                  exp.x = e.x
                  exp.y = e.y
                  exp.z = e.z
                  @scene.addChild(exp)

        cam.centerX = @player.x + @player.rotation[8] * 2
        cam.centerY = 0.5
        cam.centerZ = @player.z + @player.rotation[10] * 2
        cam.chase(@player, -15, 10)
        cam.y = 2

      return
    @start()

window.onload = ->
  new Sample_Doga

