import styled from 'styled-components';

const ButtonComponent = styled.button`
  background: linear-gradient(to bottom, #f7b733, #fc4a1a);
  border: 2px solid #f7b733;
  border-radius: 10px;
  padding: 10px 20px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 0px #000;
  box-shadow: 0px 4px 0px #c46a0f, 0px 8px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 2px 0px #c46a0f, 0px 4px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(2px);
  }

  &:active {
    box-shadow: 0px 0px 0px #c46a0f, 0px 2px 5px rgba(0, 0, 0, 0.2);
    transform: translateY(4px);
  }
`;

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

const Button = ({children, onClick, ...props}: Props) => {
  const onClickTimeout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTimeout(() => {
      if(onClick) {
        onClick(event)
      }
    }, 200)
  }

  return (
    <ButtonComponent onClick={onClickTimeout} {...props}>
      {children}
    </ButtonComponent>
  );
};

export default Button;
