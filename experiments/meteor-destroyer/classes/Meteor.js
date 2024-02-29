class Meteor {
  constructor(scene) {
    this.scene = scene;
    // this.x
    // this.y
    // this.z
    // this.scale = this.z

    this.create();
  }

  create() {
    console.log(this.scene);

    const meteor = this.scene.physics.add.image(100, 100, "meteor");
    meteor.setBlendMode("ADD");
    meteor.setVelocity(400, 100);
    meteor.setBounce(0, 0);
    meteor.setCollideWorldBounds(true);

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
