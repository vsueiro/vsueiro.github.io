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
    this.createFragments();
    this.createGlare();
    this.scene.time.delayedCall(200, () => {
      this.createHeatWave();
    });
  }

  createFragments() {
    this.fragmentsEmitter = this.scene.add.particles(
      this.options.x,
      this.options.y,
      "meteor-fragments",
      {
        lifespan: 1000,
        speed: { min: 200, max: 600 },
        scale: { start: this.options.s, end: 0 },
        gravityY: this.scene.physics.world.gravity.y * 4,
        blendMode: "ADD",
        emitting: false,
      }
    );

    this.fragmentsEmitter.explode(Phaser.Math.Between(16, 32));
  }

  createGlare() {
    this.glareEmitter = this.scene.add.particles(
      this.options.x,
      this.options.y,
      "glare",
      {
        lifespan: 400,
        speed: { min: 0, max: 0 },
        alpha: { start: 1, end: 0 },
        scale: { start: this.options.s * 1, end: this.options.s * 4 },
        gravityY: 0,
        blendMode: "ADD",
        emitting: false,
      }
    );

    this.glareEmitter.explode(2);
  }

  createHeatWave() {
    this.glareEmitter = this.scene.add.particles(
      this.options.x,
      this.options.y,
      "meteor-trace",
      {
        lifespan: 400,
        speed: { min: 0, max: 0 },
        alpha: { start: 1, end: 0 },
        scale: { start: this.options.s * 1, end: this.options.s * 8 },
        gravityY: 0,
        blendMode: "ADD",
        emitting: false,
      }
    );

    this.glareEmitter.explode(1);
  }
}

export default Explosion;
