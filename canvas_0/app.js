import { Hill } from './hill.js';
import { SheepController } from './sheep-controller.js';
import { Sun } from './sun.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.sun = new Sun();

    this.hills = [
      new Hill('#fd6bea', 0.2, 12),
      new Hill('#ff59c2', 0.5, 8),
      new Hill('#ff4674', 1.4, 6),
    ];

    this.sheepController = new SheepController();

    //this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // 스크린 사이즈를 가져오기 위한 이벤트
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.sun.resize(this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    this.sheepController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    // 캔버스를 일단 깨끗하게 지워주는 코드
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.sun.draw(this.ctx, t);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }

    this.sheepController.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};
