import Explosion from "./Explosion.js";

const defaults = {
  x: 100,
  y: 0,
  z: 0,
  vx: 400,
  vy: 0,
  s: 1,
};

class Meteor {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.gameObject = undefined;
    this.options = { ...defaults, ...options };
    this.isExploding = false;

    this.create();
  }

  create() {
    this.gameObject = this.scene.physics.add.image(
      this.options.x,
      this.options.y,
      "meteor"
    );
    this.gameObject.setScale(this.options.s);
    this.gameObject.setBlendMode("ADD");
    this.gameObject.setVelocity(this.options.vx, this.options.vy);
    this.gameObject.setDepth(1);

    this.particles = this.scene.add.particles(0, 0, "meteor-trace", {
      speed: 10,
      quantity: 5,
      scale: { start: this.options.s, end: 0 },
      alpha: { start: 0.5, end: 0 },
      blendMode: "ADD",
    });
    this.particles.startFollow(this.gameObject);
  }

  checkCollision(index) {
    const x = this.gameObject.x;
    const y = this.gameObject.y;

    console.log(this.gameObject);

    if (y > this.scene.options.ground) {
      this.explode(index);
    }
  }

  explode(index) {
    if (this.isExploding) {
      return;
    }

    this.isExploding = true;
    const x = this.gameObject.x;
    const y = this.gameObject.y;
    const s = this.options.s;

    new Explosion(this.scene, { x, y, s });

    this.scene.meteors.list.splice(index, 1);
    this.gameObject.setVelocity(0, 0);
    this.gameObject.destroy();
    this.particles.stop();

    this.scene.time.delayedCall(2000, () => {
      this.particles.destroy();
    });
  }
}

export default Meteor;
