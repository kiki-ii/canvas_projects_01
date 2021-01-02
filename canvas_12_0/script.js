class CirclesIntersection {
  constructor() {
    this.circleStrokeColor = `white`;
  }

  init() {
    this.createCanvas();
    this.setCanvasSize();
    this.createCircles();
    this.updateAnimation();

    window.addEventListener(`resize`, () => {
      this.setCanvasSize();
      this.createCircles();
    });
  }

  createCanvas() {
    this.cnv = document.createElement(`canvas`);
    this.cnv.style.background = this.getRandomColor();
    this.ctx = this.cnv.getContext(`2d`);
    document.body.appendChild(this.cnv);
  }

  getRandomColor(alpha = 1) {
    return `hsla(${Math.random() * 360}, 70%, 50%, ${alpha})`;
  }

  setCanvasSize() {
    this.w = this.cnv.width = innerWidth;
    this.h = this.cnv.height = innerHeight;
  }

  createCircles() {
    let smallerSide = Math.min(this.w, this.h);
    let biggerSide = Math.max(this.w, this.h);
    let maxRadius = smallerSide / 3;
    let minRadius = maxRadius / 2;
    let circlesNum = 4 * (2 - smallerSide / biggerSide);

    this.circles = [];
    for (let i = 0; i < circlesNum; ++i) {
      let newCircle = {
        color: this.getRandomColor(0.5),
        radius: this.getRandomFromRange(minRadius, maxRadius),
        xPos: this.getRandomFromRange(maxRadius, this.w - maxRadius),
        yPos: this.getRandomFromRange(maxRadius, this.h - maxRadius),
      };
      this.circles.push(newCircle);
    }
  }
  getRandomFromRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  updateCircles() {
    this.circles.forEach(circle => {
      this.drawCircle(
        circle.xPos,
        circle.yPos,
        circle.radius,
        circle.color,
        this.circleStrokeColor
      );
    });
  }
  drawCircle(x, y, radius, fillColor, strokeColor) {
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  updateAnimation() {
    this.updateCircles();
  }
}

window.onload = () => {
  new CirclesIntersection().init();
};
