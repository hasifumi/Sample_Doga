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
        player = new Player();
        player.scale(0.5, 0.5, 0.5);
        player.y = 0.5;
        scene.addChild(player);
        this.timer = new Node();
        this.rootScene.addChild(this.timer);
        ground = new PlaneXZ(40);
        (function() {
          var tex;
          tex = ground.mesh.texture;
          tex.specular = [0, 0, 0, 1];
          return tex.src = _this.assets["image/grand_sample_tex.jpg"];
        })();
        scene.addChild(ground);
        this.onenterframe = function() {
          cam.centerX = player.x + player.rotation[8] * 2;
          cam.centerY = 0.5;
          cam.centerZ = player.z + player.rotation[10] * 2;
          cam.chase(player, -15, 10);
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
      var _this = this;
      this.game = enchant.Game.instance;
      Player.__super__.constructor.call(this);
      this.model = this.game.assets["model/boss3.l3c.js"];
      this.addChild(this.model);
      this.walking = false;
      this.onenterframe = function() {
        _this.walking = false;
        if (_this.game.input.up) {
          _this.forward(0.3);
          _this.walking = true;
        } else {
          if (_this.game.input.down) {
            _this.forward(-0.2);
            _this.walking = true;
          }
        }
        if (_this.game.input.left) {
          _this.rotateYaw(0.1);
          _this.walking = true;
        } else {
          if (_this.game.input.right) {
            _this.rotateYaw(-0.1);
            _this.walking = true;
          }
        }
        if (_this.walking) {
          return _this.game.timer.tl.then(function() {
            return _this.model.animate("Pose3", 10);
          }).delay(10).then(function() {
            return _this.model.animate("Pose4", 10);
          }).delay(10).loop();
        } else {
          return _this.game.timer.tl.clear();
        }
      };
    }

    return Player;

  })(Sprite3D);

  TitleScene = (function(_super) {

    __extends(TitleScene, _super);

    function TitleScene() {
      TitleScene.__super__.constructor.call(this);
    }

    return TitleScene;

  })(Scene);

}).call(this);
