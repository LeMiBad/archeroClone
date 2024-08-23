export class Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  directionX: number;
  directionY: number;

  constructor(x: number, y: number, width: number, height: number, color: string, speed: number, directionX: number, directionY: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.directionX = directionX;
    this.directionY = directionY;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // Обновление позиции пули в зависимости от направления и скорости
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  }

  isOutOfBounds(canvasWidth: number, canvasHeight: number) {
    // Проверка, вышла ли пуля за границы canvas
    return this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight;
  }
}
