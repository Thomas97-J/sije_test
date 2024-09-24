import styled from "styled-components";

interface IndicatorProps {
  images: UnsplashImage[];
  activeImageIndex: number;
  skipToImage: (index: number) => void;
}

function Indicator({ images, activeImageIndex, skipToImage }: IndicatorProps) {
  return (
    <IndicatorWrapper>
      {images.map((image: UnsplashImage, index: number) => (
        <IndicatorDot
          key={image.id}
          onClick={() => skipToImage(index)}
          $isActive={index === activeImageIndex}
        />
      ))}
    </IndicatorWrapper>
  );
}

const IndicatorWrapper = styled.div`
  display: flex;
`;

const IndicatorDot = styled.div<{ $isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${(props) => (props.$isActive ? "#3b3b3b" : "#aeaeae")};
  margin: 4px;
  &:hover {
    cursor: pointer;
  }
`;

export default Indicator;
