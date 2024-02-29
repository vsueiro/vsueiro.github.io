class Meteor {
  constructor(scene, options = {}) {
    this.scene = scene;

    // Define default values
    const defaults = {
      x: 100,
      y: 0,
      z: 0,
    };

    // Merge defaults with provided options
    this.options = { ...defaults, ...options };
    // this.x
    // this.y
    // this.z
    // this.scale = this.z

    this.create();
  }

  create() {
    console.log(this.scene);

    const meteor = this.scene.physics.add.image(
      this.options.x,
      this.options.y,
      "meteor"
    );
    meteor.setBlendMode("ADD");
    meteor.setVelocity(400, 100);
    // meteor.setBounce(0, 0);
    // meteor.setCollideWorldBounds(true);

    const particles = this.scene.add.particles(0, 0, "meteor-trace", {
      speed: 10,
      quantity: 5,
      scale: { start: 1, end: 0 },
      alpha: { start: 0.5, end: 0 },
      blendMode: "ADD",
    });
    particles.startFollow(meteor);
  }
}

export default Meteor;
