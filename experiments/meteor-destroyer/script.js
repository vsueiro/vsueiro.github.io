import Background from "./classes/Background.js";
import Meteor from "./classes/Meteor.js";
import Mountains from "./classes/Mountains.js";

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
    const background = new Background(this);
    const meteor = new Meteor(this);
    const mountains = new Mountains(this);
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
