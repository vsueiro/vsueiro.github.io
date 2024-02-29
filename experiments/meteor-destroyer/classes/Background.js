class Background {
  constructor(scene) {
    this.scene = scene;

    this.create();
  }

  create() {
    this.scene.add.image(0, 0, "background").setOrigin(0, 0);
  }
}

export default Background;
