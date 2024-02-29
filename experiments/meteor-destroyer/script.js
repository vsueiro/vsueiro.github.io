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

    // Schedule more meteors to be created at random intervals
    this.time.addEvent({
      delay: Phaser.Math.Between(500, 2500), // Change minimum and maximum delay as needed
      callback: this.createMeteor,
      callbackScope: this,
      loop: true, // Keep creating meteors at random intervals
    });

    const mountains = new Mountains(this);
  }

  createMeteor() {
    // Generate a random x position for each meteor
    let x = Phaser.Math.Between(-(width * 0.333), width * 0.666);

    // Optionally, generate a random y position or use a fixed value if you want them to always come from the top
    let y = Phaser.Math.Between(-200, -25); // Start off-screen if desired

    // Create a meteor at the random position
    new Meteor(this, { x: x, y: y });

    // You can adjust properties of the meteor here if needed, e.g., velocity or scale
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
