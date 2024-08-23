import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gameInit } from "./gameInit";
import nipplejs from "nipplejs"; // Импортируем nipplejs

const CanvasWrapper = styled.canvas`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const JoystickWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 30%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Joystick = styled.div`
  z-index: 1000;
`;

const GameField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const joystickRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const gameData = gameInit(canvas); // Получаем объект героя и функцию очистки

      if(gameData) {
        const { cleanup, hero } = gameData
        
        if (joystickRef.current) {
          const joystick = nipplejs.create({
            zone: joystickRef.current,
            mode: "static",
            position: { left: "50%", top: "50%" },
            color: "white",
          });
  
          joystick.on("move", (event, data) => {
            const dx = data.vector.x * 5;
            const dy = -data.vector.y * 5;
            
            // Двигаем героя на основе данных джойстика
            hero.move(dx, dy, canvas.width, canvas.height);
          });
  
          joystick.on("end", () => {
            // Когда джойстик отпускается, можно остановить движение или выполнить другие действия
            // В данном случае, движение героя будет остановлено автоматически, т.к. `move` больше не вызывается
          });
        }
  
        return () => {
          if (cleanup) cleanup();
        };
      }

    }
  }, []);

  return (
    <>
      <CanvasWrapper ref={canvasRef}></CanvasWrapper>
      <JoystickWrapper>
        <Joystick ref={joystickRef}></Joystick>
      </JoystickWrapper>
    </>
  );
};

export default GameField;
