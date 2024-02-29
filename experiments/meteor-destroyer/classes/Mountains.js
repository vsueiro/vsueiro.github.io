class Mountains {
  constructor(scene) {
    this.scene = scene;

    this.create();
  }
  create() {
    this.scene.add.image(0, 1080 - 72, "mountains").setOrigin(0, 0);
    console.log("yoo");
  }
}

export default Mountains;
