import styled from "styled-components";
import { useState, useRef } from "react";
import CarouselCard from "./CarouselCard";
import { motion } from "framer-motion";

function Carousel({ firstFiveImages }: { firstFiveImages: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const extendedImages = [...firstFiveImages];
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + extendedImages.length) % extendedImages.length
    );
  };

  return (
    <CarouselWrapper ref={carouselRef}>
      <Button onClick={prevImage}>◀</Button>
      <CarouselBody>
        <CarouselBodyWrapper
          drag="x"
          dragConstraints={{
            left: -50,
            right: 50,
          }}
          //스냅 css를 써볼까?
          onDragEnd={(event, info) => {
            if (info.offset.x > 100) {
              prevImage();
            } else if (info.offset.x < -100) {
              nextImage();
            }
          }}
        >
          <CarouselCard
            key={
              extendedImages[
                (currentIndex - 1 + extendedImages.length) %
                  extendedImages.length
              ]?.id
            }
            image={
              extendedImages[
                (currentIndex - 1 + extendedImages.length) %
                  extendedImages.length
              ]
            }
            currentIndex={currentIndex}
          />
          <CarouselCard
            key={extendedImages[currentIndex]?.id}
            image={extendedImages[currentIndex]}
            currentIndex={currentIndex}
          />
          <CarouselCard
            key={extendedImages[(currentIndex + 1) % extendedImages.length]?.id}
            image={extendedImages[(currentIndex + 1) % extendedImages.length]}
            currentIndex={currentIndex}
          />
        </CarouselBodyWrapper>
      </CarouselBody>

      <Button onClick={nextImage}>▶</Button>
    </CarouselWrapper>
  );
}

const CarouselBody = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  overflow: hidden;
  position: relative; /* 추가 */

  &::before,
  &::after {
    content: ""; /* 추가 */
    position: absolute; /* 추가 */
    top: 0;
    width: 80px; /* 흐림 부분의 너비 */
    height: 100%;
    z-index: 1;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0 16px;
  user-select: none;

  &:hover {
    opacity: 0.7;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin: 16px 0;
  display: flex;
  align-items: center;
`;
const CarouselBodyWrapper = styled(motion.div)`
  display: flex;
`;

export default Carousel;
