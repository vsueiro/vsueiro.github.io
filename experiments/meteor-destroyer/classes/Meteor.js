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
    console.log(scene);

    this.scene = scene;
    this.gameObject = undefined;
    this.options = { ...defaults, ...options };

    this.create();
  }

  create() {
    console.log(this.scene);

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
}

export default Meteor;