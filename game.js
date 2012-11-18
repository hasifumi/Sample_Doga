(function() {
  var Bullet, Bullets, Enemies, Enemy, Explosion, Player, Sample_Doga, TitleScene,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  enchant();

  Sample_Doga = (function(_super) {

    __extends(Sample_Doga, _super);

    function Sample_Doga() {
      Sample_Doga.__super__.constructor.call(this);
      this.keybind("Z".charCodeAt(0), "a");
      this.preload("image/grand_sample_tex.jpg", "model/boss3.l3c.js", "model/robo4.l3p.js", "image/explosion.jpeg");
      this.onload = function() {
        var cam, ground,
          _this = this;
        this.scene = new Scene3D();
        cam = this.scene.getCamera();
        cam.x = 0;
        cam.y = 10;
        cam.z = -20;
        this.bullets = new Bullets();
        this.enemies = new Enemies();
        this.player = new Player();
        this.player.scale(0.5, 0.5, 0.5);
        this.player.y = 0.5;
        this.scene.addChild(this.player);
        ground = new PlaneXZ(40);
        (function() {
          var tex;
          tex = ground.mesh.texture;
          tex.specular = [0, 0, 0, 1];
          return tex.src = _this.assets["image/grand_sample_tex.jpg"];
        })();
        this.scene.addChild(ground);
        this.onenterframe = function() {
          var b, e, exp, _i, _j, _len, _len2, _ref, _ref2;
          if (_this.frame % 100 === 0) {
            e = _this.enemies.get();
            if (e) {
              e.x = Math.random() * 80 - 40;
              e.y = 0.5;
              e.z = Math.random() * 80 - 40;
              _this.scene.addChild(e);
            }
          }
          _ref = _this.bullets.ary;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            b = _ref[_i];
            if (b.active) {
              _ref2 = _this.enemies.ary;
              for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                e = _ref2[_j];
                if (e.active) {
                  if (b.intersect(e)) {
                    if (b.parentNode) b.parentNode.removeChild(b);
                    e.damage();
                    exp = new Explosion(b, 1, 3);
                    exp.x = e.x;
                    exp.y = e.y;
                    exp.z = e.z;
                    _this.scene.addChild(exp);
                  }
                }
              }
            }
          }
          cam.centerX = _this.player.x + _this.player.rotation[8] * 2;
          cam.centerY = 0.5;
          cam.centerZ = _this.player.z + _this.player.rotation[10] * 2;
          cam.chase(_this.player, -15, 10);
          return cam.y = 2;
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
      this.timer = new Node();
      this.game.rootScene.addChild(this.timer);
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
          _this.timer.tl.then(function() {
            return _this.model.animate("Pose3", 10);
          }).delay(10).then(function() {
            return _this.model.animate("Pose4", 10);
          }).delay(10).loop();
        } else {
          _this.timer.tl.clear();
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
      this.scaleX = 0.5;
      this.scaleY = 0.5;
      this.scaleZ = 2.0;
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
      for (i = 0; i < 20; i++) {
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
          return i;
        }
      }
    };

    return Bullets;

  })();

  Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy() {
      this.damage = __bind(this.damage, this);
      var _this = this;
      this.game = enchant.Game.instance;
      Enemy.__super__.constructor.call(this);
      this.model = this.game.assets["model/robo4.l3p.js"];
      this.addChild(this.model);
      this.scale(2, 2, 2);
      this.hp = 5;
      this.timer = new Node();
      this.game.rootScene.addChild(this.timer);
      this.active = false;
      this.onenterframe = function() {
        var tf, tt;
        if (_this.age % 60 < 30) {
          _this.timer.tl.clear();
          return _this.forward(0.2);
        } else {
          if (_this.age % 60 === 40) {
            tt = Math.atan2(_this.game.player.x - _this.x, _this.game.player.z - _this.z);
            tf = Math.atan2(_this.rotation[8], _this.rotation[10]);
            return _this.timer.tl.then(function() {
              return _this.rotationApply(new Quat(0, 1, 0, (tt - tf) / 20));
            }).delay(2).loop();
          }
        }
      };
      this.on("removed", function() {
        return _this.active = false;
      });
    }

    Enemy.prototype.damage = function() {
      var exp;
      this.hp -= 1;
      if (this.hp <= 0) {
        if (this.parentNode) {
          exp = new Explosion(this, 2);
          exp.x = this.x;
          exp.y = this.y;
          exp.z = this.z;
          this.game.scene.addChild(exp);
          return this.parentNode.removeChild(this);
        }
      }
    };

    return Enemy;

  })(Sprite3D);

  Enemies = (function() {

    function Enemies() {
      this.get = __bind(this.get, this);
      var b, i;
      this.game = enchant.Game.instance;
      this.ary = [];
      for (i = 0; i < 10; i++) {
        b = new Enemy();
        this.ary.push(b);
      }
    }

    Enemies.prototype.get = function() {
      var i, _i, _len, _ref;
      _ref = this.ary;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.active !== true) {
          i.active = true;
          i.age = 0;
          i.hp = 5;
          return i;
        }
      }
    };

    return Enemies;

  })();

  Explosion = (function(_super) {

    __extends(Explosion, _super);

    function Explosion(bullet, scale) {
      var tex,
        _this = this;
      this.game = enchant.Game.instance;
      Explosion.__super__.constructor.call(this, 0.5);
      tex = this.mesh.texture;
      tex.ambient = [1, 1, 1, 1];
      tex.diffuse = [0, 0, 0, 1];
      tex.specular = [0, 0, 0, 1];
      tex.src = this.game.assets["image/explosion.jpeg"];
      this.x = bullet.x;
      this.y = bullet.y;
      this.z = bullet.z;
      this.onenterframe = function() {
        _this.scale(scale, scale, scale);
        if (_this.age > 10) return _this.parentNode.removeChild(_this);
      };
    }

    return Explosion;

  })(Sphere);

  TitleScene = (function(_super) {

    __extends(TitleScene, _super);

    function TitleScene() {
      TitleScene.__super__.constructor.call(this);
    }

    return TitleScene;

  })(Scene);

}).call(this);
