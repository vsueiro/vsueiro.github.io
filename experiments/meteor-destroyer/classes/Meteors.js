import Meteor from "./Meteor.js";

class Meteors {
  constructor(scene) {
    this.scene = scene;
    this.list = [];
  }

  createMeteor() {
    const offset = 0.8;
    const width = this.scene.options.width;
    const height = this.scene.options.height;

    const options = {};
    options.x = Phaser.Math.Between(width * -offset, height * offset);
    options.y = Phaser.Math.Between(-40, -200);
    options.s = Phaser.Math.FloatBetween(0.5, 1);
    options.vx = Phaser.Math.Between(600, 600);
    options.vy = Phaser.Math.Between(200, 400) * options.s;

    const meteor = new Meteor(this.scene, options);

    this.list.push(meteor);
  }

  checkCollisions() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const meteor = this.list[i];
      meteor.checkCollision(i);
    }
  }
}

export default Meteors;
