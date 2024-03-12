import Background from "./classes/Background.js";
import Meteors from "./classes/Meteors.js";
import Mountains from "./classes/Mountains.js";

const options = {
  width: 1920,
  height: 1080,
  ground: 1080 - 32,
  gravity: { y: 128 },
};

class MeteorsScene extends Phaser.Scene {
  preload() {
    this.load.setBaseURL("./assets/");

    this.load.image("background", "background.png");
    this.load.image("meteor", "meteor.png");
    this.load.image("meteor-trace", "meteor-trace.png");
    this.load.image("meteor-fragments", "meteor-trace.png");
    this.load.image("glare", "meteor.png");
    this.load.image("mountains", "mountains.png");
  }

  create() {
    this.options = options;

    this.background = new Background(this);

    this.meteors = new Meteors(this);

    this.time.addEvent({
      delay: Phaser.Math.Between(400, 2000),
      loop: true,
      callbackScope: this,
      callback: () => {
        this.meteors.createMeteor(this);
      },
    });

    this.mountains = new Mountains(this);
  }

  update() {
    this.meteors.checkCollisions();
  }
}

const config = {
  type: Phaser.AUTO,
  width: options.width,
  height: options.height,
  scene: MeteorsScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: options.gravity,
    },
  },
};

const game = new Phaser.Game(config);
