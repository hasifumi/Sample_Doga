(function() {
  var Player, Sample_Doga, TitleScene,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  enchant();

  Sample_Doga = (function(_super) {

    __extends(Sample_Doga, _super);

    function Sample_Doga() {
      Sample_Doga.__super__.constructor.call(this);
      this.keybind("Z".charCodeAt(0), "a");
      this.preload("image/grand_sample_tex.jpg", "model/boss3.l3c.js");
      this.onload = function() {
        var b, bo, cam, ground, i, player,
          _this = this;
        this.scene = new Scene3D();
        cam = this.scene.getCamera();
        cam.x = 0;
        cam.y = 10;
        cam.z = -20;
        this.bullets = [];
        bo = new Sphere(0.2);
        bo.mesh.setBaseColor([1, 1, 0, 1]);
        bo.mesh.texture.ambient = [1, 1, 1, 1];
        bo.mesh.texture.diffuse = [0, 0, 0, 1];
        for (i = 0; i < 10; i++) {
          b = bo.clone();
          b.on("removed", function() {
            return this.active = false;
          });
          b.onenterframe = function() {
            this.forward(0.6);
            if (this.age > 100) return this.parentNode.removeChild(this);
          };
          b.active = false;
          this.bullets.push(b);
        }
        this.bullets.get = function() {
          var i, _i, _len, _ref;
          _ref = _this.bullets;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.active !== true) {
              i.active = true;
              i.age = 0;
              i.x = player.x;
              i.y = player.y;
              i.z = player.z;
              i.rotation = player.rotation;
              return i;
            }
          }
        };
        player = new Player();
        player.scale(0.5, 0.5, 0.5);
        player.y = 0.5;
        this.scene.addChild(player);
        this.timer = new Node();
        this.rootScene.addChild(this.timer);
        ground = new PlaneXZ(40);
        (function() {
          var tex;
          tex = ground.mesh.texture;
          tex.specular = [0, 0, 0, 1];
          return tex.src = _this.assets["image/grand_sample_tex.jpg"];
        })();
        this.scene.addChild(ground);
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
      this.heat = 0;
      this.onenterframe = function() {
        var b;
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
          _this.game.timer.tl.then(function() {
            return _this.model.animate("Pose3", 10);
          }).delay(10).then(function() {
            return _this.model.animate("Pose4", 10);
          }).delay(10).loop();
        } else {
          _this.game.timer.tl.clear();
        }
        if (_this.game.input.a && _this.heat <= 0) {
          b = _this.game.bullets.get();
          if (b.active) {
            _this.game.scene.addChild(b);
            _this.heat = 3;
          }
        }
        return _this.heat -= 1;
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
