class Popup {
  constructor(x, y) {
    this.width = this.random(20, 25);
    this.height = this.random(20, 25);

    this.x = x || this.random(10, 90);
    this.y = y || this.random(10, 90);

    this.element = document.createElement("div");

    this.element.addEventListener("click", () => {
      this.close();
      this.duplicate();
    });

    this.render();
  }
  render() {
    this.element.classList.add("popup");

    Object.assign(this.element.style, {
      left: this.x + "%",
      top: this.y + "%",
      width: this.width + "vw",
      height: this.width + "vw"
    });

    document.body.append(this.element);
  }
  random(min, max) {
    return min + Math.random() * (max - min);
  }
  close() {
    event.target.remove();
  }
  duplicate() {
    new Popup();
    new Popup();
  }
}

new Popup(50, 50);
