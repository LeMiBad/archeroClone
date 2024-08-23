import phone from "./../../assets/phone.webp";
import Button from "../../shared/Button";
import styles from "./styles";
import GameField from "../../features/GameField/GameField";
import { useState } from "react";

const { Wrapper, Phone, ButtonWrapper } = styles;

const MainPage = () => {
  const [isPlay, setIsPlay] = useState(false);

  const clickHandler = () => {
    setIsPlay(true);
  };

  return (
    <Wrapper>
      {isPlay ? (
        <GameField />
      ) : (
        <>
          <Phone src={phone} alt={"phone"} />
          <ButtonWrapper>
            <Button onClick={clickHandler}>Играть</Button>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default MainPage;
