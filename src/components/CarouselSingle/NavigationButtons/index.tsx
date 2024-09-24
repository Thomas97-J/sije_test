import styled from "styled-components";

interface NavigationButtonsProps {
  swipeToImage: (direction: number) => void;
}

function NavigationButtons({ swipeToImage }: NavigationButtonsProps) {
  return (
    <ButtonWrapper>
      <button onClick={() => swipeToImage(-1)}>◀</button>
      <button onClick={() => swipeToImage(1)}>▶</button>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  margin-top: 12px;
  display: flex;

  button {
    outline: none;
    border: none;
    user-select: none;
    padding: 10px 12px;
    background-color: #bcbcbc;
    &:first-of-type {
      margin-right: 15px;
    }

    &:hover {
      cursor: pointer;
    }

    &:active {
      transform: scale(0.98);
    }

    @media (max-width: 480px) {
      padding: 5px 6px;
    }
  }
`;
export default NavigationButtons;
