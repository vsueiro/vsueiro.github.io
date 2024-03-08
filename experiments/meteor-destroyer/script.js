import Background from "./classes/Background.js";
import Meteors from "./classes/Meteors.js";
import Mountains from "./classes/Mountains.js";

const options = {
  width: 1920,
  height: 1080,
  gravity: { y: 100 },
};

class MeteorsScene extends Phaser.Scene {
  preload() {
    this.load.setBaseURL("./assets/");

    this.load.image("background", "background.png");
    this.load.image("meteor", "meteor.png");
    this.load.image("meteor-trace", "meteor-trace.png");
    this.load.image("meteor-fragments", "meteor-trace.png");
    this.load.image("mountains", "mountains.png");
  }

  create() {
    this.options = options;

    const background = new Background(this);

    this.meteors = new Meteors(this);

    this.time.addEvent({
      delay: Phaser.Math.Between(400, 2000),
      callback: () => {
        this.meteors.createMeteor(this);
      },
      callbackScope: this,
      loop: true,
    });

    const mountains = new Mountains(this);
  }

  update() {
    this.meteors.checkCollision();
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
