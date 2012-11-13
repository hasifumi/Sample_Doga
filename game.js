(function() {
  var Bullet, Bullets, Player, Sample_Doga, TitleScene,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  enchant();

  Sample_Doga = (function(_super) {

    __extends(Sample_Doga, _super);

    function Sample_Doga() {
      Sample_Doga.__super__.constructor.call(this);
      this.keybind("Z".charCodeAt(0), "a");
      this.preload("image/grand_sample_tex.jpg", "model/boss3.l3c.js");
      this.onload = function() {
        var cam, ground,
          _this = this;
        this.scene = new Scene3D();
        cam = this.scene.getCamera();
        cam.x = 0;
        cam.y = 10;
        cam.z = -20;
        this.bullets = new Bullets();
        this.player = new Player();
        this.player.scale(0.5, 0.5, 0.5);
        this.player.y = 0.5;
        this.scene.addChild(this.player);
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
          cam.centerX = this.player.x + this.player.rotation[8] * 2;
          cam.centerY = 0.5;
          cam.centerZ = this.player.z + this.player.rotation[10] * 2;
          cam.chase(this.player, -15, 10);
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
          if (b) {
            _this.game.scene.addChild(b);
            _this.heat = 3;
          }
        }
        return _this.heat -= 1;
      };
    }

    return Player;

  })(Sprite3D);

  Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet() {
      var _this = this;
      this.game = enchant.Game.instance;
      Bullet.__super__.constructor.call(this, 0.2);
      this.mesh.setBaseColor([1, 1, 0, 1]);
      this.mesh.texture.ambient = [1, 1, 1, 1];
      this.mesh.texture.diffuse = [0, 0, 0, 1];
      this.active = false;
      this.onenterframe = function() {
        _this.forward(0.6);
        if (_this.age > 100) return _this.parentNode.removeChild(_this);
      };
      this.on("removed", function() {
        return _this.active = false;
      });
    }

    return Bullet;

  })(Sphere);

  Bullets = (function() {

    function Bullets() {
      this.get = __bind(this.get, this);
      var b, i;
      this.game = enchant.Game.instance;
      this.ary = [];
      for (i = 0; i < 10; i++) {
        b = new Bullet();
        this.ary.push(b);
      }
    }

    Bullets.prototype.get = function() {
      var i, _i, _len, _ref;
      _ref = this.ary;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.active !== true) {
          i.active = true;
          i.age = 0;
          i.x = this.game.player.x;
          i.y = this.game.player.y;
          i.z = this.game.player.z;
          i.rotation = this.game.player.rotation;
          return i;
        }
      }
    };

    return Bullets;

  })();

  TitleScene = (function(_super) {

    __extends(TitleScene, _super);

    function TitleScene() {
      TitleScene.__super__.constructor.call(this);
    }

    return TitleScene;

  })(Scene);

}).call(this);
