let width = 1920;
let height = 1080;

class MeteorsScene extends Phaser.Scene {
  preload() {
    this.load.setBaseURL("./assets/");

    this.load.image("background", "background.png");
    this.load.image("meteor", "meteor.png");
    this.load.image("meteor-trace", "meteor-trace.png");
    this.load.image("mountains", "mountains.png");
  }

  create() {
    const background = this.add.image(0, 0, "background");
    background.setOrigin(0, 0);

    const meteor = this.physics.add.image(100, 100, "meteor");
    meteor.setBlendMode("ADD");
    meteor.setVelocity(400, 100);
    meteor.setBounce(0, 0);
    meteor.setCollideWorldBounds(true);

    const particles = this.add.particles(0, 0, "meteor-trace", {
      speed: 10,
      quantity: 5,
      scale: { start: 1, end: 0 },
      alpha: { start: 0.5, end: 0 },
      blendMode: "ADD",
    });
    particles.startFollow(meteor);

    const mountains = this.add.image(0, height - 72, "mountains");
    mountains.setOrigin(0, 0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  scene: MeteorsScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
};

const game = new Phaser.Game(config);
