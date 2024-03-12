const defaults = {
  x: 0,
  y: 0,
  s: 1,
};

class Explosion {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.options = { ...defaults, ...options };

    this.create();
  }
  create() {
    this.emitter = this.scene.add.particles(
      this.options.x,
      this.options.y,
      "meteor-fragments",
      {
        lifespan: 1000,
        speed: { min: 200, max: 600 },
        scale: { start: this.options.s, end: 0 },
        gravityY: this.scene.physics.world.gravity.y * 6,
        blendMode: "ADD",
        emitting: false,
      }
    );

    const amount = Phaser.Math.Between(16, 32);
    this.emitter.explode(amount);
  }
}

export default Explosion;
