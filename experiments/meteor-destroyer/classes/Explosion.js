// const defaults = {
//   x: 200,
//   y: 200,
//   s: 1,
// };

// class Explosion {
//   constructor(scene, options = {}) {
//     this.scene = scene;
//     this.gameObject = undefined;
//     this.options = { ...defaults, ...options };

//     this.create();
//   }

//   create() {
//     this.particles = this.scene.add.particles("meteor-fragments");

//     this.emitter = this.particles.createEmitter({
//       speed: 200,
//       quantity: 5,
//       scale: { start: this.options.s, end: 0 },
//       alpha: { start: 0.5, end: 0 },
//       blendMode: "ADD",
//     });

//     this.emitter.explode(5, this.options.x, this.options.y);
//   }
// }

// export default Explosion;
