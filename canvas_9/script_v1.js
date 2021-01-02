(() => {
  const config = {
    dotMinRad: 6,
    dotMaxRad: 20,
    massFactor: 0.002,
    defcolor: `rgba(250, 10, 30, 0.9)`,
  };

  const TWO_PI = 2 * Math.PI;
  const canvas = document.querySelector(`canvas`);
  const ctx = canvas.getContext(`2d`);

  let w, h, mouse, dots;

  class Dot {
    constructor() {
      this.pos = { x: mouse.x, y: mouse.y };
      this.vel = { x: 0, y: 0 };
      this.rad = random(config.dotMinRad, config.dotMaxRad);
      this.mass = this.rad * config.massFactor;
      this.color = config.defcolor;
    }
    draw() {
      createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
      createCircle(this.pos.x, this.pos.y, this.rad, false, config.defcolor);
    }
  }

  function createCircle(x, y, rad, fill, color) {
    ctx.fillStyle = ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, TWO_PI);
    ctx.closePath();
    fill ? ctx.fill() : ctx.stroke();
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function init() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;

    mouse = { x: w / 2, y: h / 2, down: false };
    dots = [];
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);

    if (mouse.down) {
      dots.push(new Dot());
    }
    dots.map(e => e.draw());

    window.requestAnimationFrame(loop);
  }

  init();
  loop();

  function setPos({ layerX, layerY }) {
    [mouse.x, mouse.y] = [layerX, layerY];
  }

  function isDown() {
    mouse.down = !mouse.down;
  }

  canvas.addEventListener(`mousemove`, setPos);
  window.addEventListener(`mousedown`, isDown);
  window.addEventListener(`mouseup`, isDown);
})();
