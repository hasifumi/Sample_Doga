(function() {
  var Player, Sample_Doga, TitleScene,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  enchant();

  Sample_Doga = (function(_super) {

    __extends(Sample_Doga, _super);

    function Sample_Doga() {
      Sample_Doga.__super__.constructor.call(this);
      this.preload("image/grand_sample_tex.jpg", "model/boss3.l3c.js");
      this.onload = function() {
        var cam, ground, player, scene,
          _this = this;
        scene = new Scene3D();
        cam = scene.getCamera();
        cam.x = 0;
        cam.y = 10;
        cam.z = -20;
        player = this.assets["model/boss3.l3c.js"];
        player.scale(0.5, 0.5, 0.5);
        player.y = 0.5;
        player.walking = false;
        player.onenterframe = function() {
          if (_this.input.up) {
            player.forward(0.3);
            player.walking = true;
          } else {
            if (_this.input.down) {
              player.forward(-0.3);
              player.walking = true;
            } else {
              player.walking = false;
            }
          }
          if (_this.input.left) {
            player.rotateYaw(0.1);
          } else {
            if (_this.input.right) player.rotateYaw(-0.1);
          }
          if (player.walking) {
            if (player.age % 10 === 0) {
              return player.animate("Pose3", 5);
            } else {
              if (player.age % 10 === 5) return player.animate("Pose4", 5);
            }
          } else {
            return player.animate("_initialPose", 5);
          }
        };
        scene.addChild(player);
        ground = new PlaneXZ(40);
        (function() {
          var tex;
          tex = ground.mesh.texture;
          tex.specular = [0, 0, 0, 1];
          return tex.src = _this.assets["image/grand_sample_tex.jpg"];
        })();
        scene.addChild(ground);
        this.onenterframe = function() {
          cam.centerX = player.x + player.rotation[8] * 5;
          cam.centerY = 0.5;
          cam.centerZ = player.z + player.rotation[10] * 5;
          cam.chase(player, -10, 10);
          return cam.y = 5;
        };
      };
      this.start();
    }

    return Sample_Doga;

  })(Game);

  window.onload = function() {
    return new Sample_Doga;
  };

  Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      this.game = enchant.Game.instance;
      Player.__super__.constructor.call(this);
    }

    return Player;

  })(Entity);

  TitleScene = (function(_super) {

    __extends(TitleScene, _super);

    function TitleScene() {
      TitleScene.__super__.constructor.call(this);
    }

    return TitleScene;

  })(Scene);

}).call(this);
