import { Bullet } from "./Bullet";

interface CharacterProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  imageSrc?: string;
  context: CanvasRenderingContext2D;
}

export class Character {
  context: CanvasRenderingContext2D;
  keys: { [key: string]: boolean } = {};
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  image: HTMLImageElement | null = null;

  constructor({
    x,
    y,
    width,
    height,
    color,
    imageSrc,
    context,
  }: CharacterProps) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.context = context;

    if (imageSrc) {
      this.image = new Image();
      this.image.src = imageSrc;

      // Добавляем обработчик загрузки изображения
      this.image.onload = () => {
        this.draw(); // Отрисовываем персонажа после загрузки изображения
      };

      // Обработка ошибок загрузки изображения
      this.image.onerror = () => {
        console.error("Failed to load image:", imageSrc);
      };
    }
  }

  draw() {
    if (this.image && this.image.complete && this.image.naturalWidth !== 0) {
      this.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  move(dx: number, dy: number, canvasWidth: number, canvasHeight: number) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (newX >= 0 && newX + this.width <= canvasWidth) {
      this.x = newX;
    }

    if (newY >= 0 && newY + this.height <= canvasHeight) {
      this.y = newY;
    }
  }
}

export class Hero extends Character {
  bullets: Bullet[] = [];
  lastShotTime: number = 0;
  shootDelay: number = 500;
  backgroundImage: HTMLImageElement | null = null;

  constructor(args: CharacterProps & { backgroundImageSrc?: string }) {
    super(args);

    if (args.backgroundImageSrc) {
      this.backgroundImage = new Image();
      this.backgroundImage.src = args.backgroundImageSrc;

      this.backgroundImage.onload = () => {
        this.update(); // Запускаем обновление после загрузки фона
      };

      this.backgroundImage.onerror = () => {
        console.error("Failed to load background image:", args.backgroundImageSrc);
        this.update(); // Продолжаем обновление даже если фон не загрузился
      };
    } else {
      this.update();
    }

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    this.keys[event.code] = true;
  };

  handleKeyUp = (event: KeyboardEvent) => {
    this.keys[event.code] = false;
  };

  shoot() {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime >= this.shootDelay) {
      const bullet = new Bullet(
        this.x + this.width / 2 - 2.5,
        this.y,
        5,
        10,
        "red",
        10,
        0,
        -1
      );
      this.bullets.push(bullet);
      this.lastShotTime = currentTime;
    }
  }

  update = () => {
    let dx = 0;
    let dy = 0;

    if (this.keys["ArrowUp"] || this.keys["KeyW"]) {
      dy = -5;
    }
    if (this.keys["ArrowDown"] || this.keys["KeyS"]) {
      dy = 5;
    }
    if (this.keys["ArrowLeft"] || this.keys["KeyA"]) {
      dx = -5;
    }
    if (this.keys["ArrowRight"] || this.keys["KeyD"]) {
      dx = 5;
    }

    if (this.keys["Space"]) {
      this.shoot();
    }

    if (dx !== 0 || dy !== 0) {
      this.move(dx, dy, this.context.canvas.width, this.context.canvas.height);
    }

    // Очищаем canvas перед перерисовкой
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    // Отрисовываем фон, если он загружен
    if (this.backgroundImage && this.backgroundImage.complete) {
      this.context.drawImage(this.backgroundImage, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    this.draw();

    this.bullets.forEach((bullet, index) => {
      bullet.update();
      bullet.draw(this.context);

      if (
        bullet.isOutOfBounds(
          this.context.canvas.width,
          this.context.canvas.height
        )
      ) {
        this.bullets.splice(index, 1);
      }
    });

    requestAnimationFrame(this.update);
  };

  removeEventListeners() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  // Методы для управления извне
  moveUp() {
    this.move(0, -5, this.context.canvas.width, this.context.canvas.height);
  }

  moveDown() {
    this.move(0, 5, this.context.canvas.width, this.context.canvas.height);
  }

  moveLeft() {
    this.move(-5, 0, this.context.canvas.width, this.context.canvas.height);
  }

  moveRight() {
    this.move(5, 0, this.context.canvas.width, this.context.canvas.height);
  }

  startShooting() {
    this.keys["Space"] = true;
  }

  stopShooting() {
    this.keys["Space"] = false;
  }
}

export class Enemy extends Character {
  bullets: Bullet[] = [];
  lastShotTime: number = 0;
  shootDelay: number = 500;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(args: CharacterProps) {
    super(args);
  }

  // Добавить дополнительные методы или свойства для противников
}
