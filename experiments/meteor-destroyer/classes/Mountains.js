class Mountains {
  constructor(scene) {
    this.scene = scene;
    this.gameObject = undefined;

    this.create();
  }
  create() {
    this.gameObject = this.scene.add.image(0, 1080 - 72, "mountains");
    this.gameObject.setOrigin(0, 0);
    this.gameObject.setDepth(2);
  }
}

export default Mountains;
