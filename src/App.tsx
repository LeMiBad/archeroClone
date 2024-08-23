import styled from "styled-components";
import { Wrapper } from "./styles";
import MainPage from "./pages/MainPage/MainPage";

export const GameWrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 375px;
  aspect-ratio: 9 / 16;
  box-shadow: 0 0 13px #0000008c;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-width: none;
    aspect-ratio: auto;
  }
`;

const App = () => {
  return (
    <Wrapper>
      <GameWrapper>
        <MainPage />
      </GameWrapper>
    </Wrapper>
  );
};

export default App;
