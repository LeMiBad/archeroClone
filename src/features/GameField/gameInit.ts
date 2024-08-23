import gameBackground from "./../../assets/gameBackground.jpg";
import lenar from "./../../assets/lenar.png";
import { Hero } from "./Character/сharacter";

export const gameInit = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");

  if (context) {
    const hero = new Hero({
      x: 50,
      y: 50,
      width: 30,
      height: 30,
      color: "blue",
      imageSrc: lenar,
      backgroundImageSrc: gameBackground,  // Передаем путь к фоновому изображению
      context,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      hero.update();  // Запускаем перерисовку при изменении размера
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return {
      hero,
      cleanup: () => {
        window.removeEventListener("resize", resizeCanvas);
        hero.removeEventListeners();
      },
    };
  }
};
