import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import styled from "styled-components";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

function CarouselSingle({
  firstFiveImages,
  handleDetailviewOpen,
}: {
  firstFiveImages: UnsplashImage[];
  handleDetailviewOpen: (image: UnsplashImage) => void;
}) {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const activeImageIndex = wrap(0, firstFiveImages.length, imageCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      swipeToImage(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [imageCount]);

  function swipeToImage(swipeDirection: number) {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  }
  function dragStartHandler() {
    setIsDragging(true);
  }

  function dragEndHandler(dragInfo: PanInfo) {
    setIsDragging(false);

    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  }
  function handleClick(image: UnsplashImage) {
    if (!isDragging) {
      handleDetailviewOpen(image);
    }
  }

  function skipToImage(imageIndex: number) {
    let changeDirection;
    if (imageIndex >= activeImageIndex) {
      changeDirection = 1;
    } else {
      changeDirection = -1;
    }
    setImageCount([imageIndex, changeDirection]);
  }
  if (!firstFiveImages) {
    return "";
  }

  return (
    <CarouselSingleWrapper>
      <SliderContainer>
        <SliderCard>
          <AnimatePresence initial={false} custom={direction}>
            {firstFiveImages[activeImageIndex] ? (
              <SliderCardBody
                key={firstFiveImages[activeImageIndex].id}
                src={firstFiveImages[activeImageIndex].urls.regular}
                alt={firstFiveImages[activeImageIndex].alt_description}
                custom={direction}
                variants={sliderVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                transition={sliderTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={dragStartHandler}
                onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                onClick={() => handleClick(firstFiveImages[activeImageIndex])}
              />
            ) : (
              ""
            )}
          </AnimatePresence>
        </SliderCard>
      </SliderContainer>
      <IndicatorWrapper>
        {firstFiveImages.map((image: UnsplashImage, index: number) => (
          <Indicator
            key={image.id}
            onClick={() => skipToImage(index)}
            $isActive={index === activeImageIndex}
          />
        ))}
      </IndicatorWrapper>
      <BottonWrapper>
        <button onClick={() => swipeToImage(-1)}>◀</button>
        <button onClick={() => swipeToImage(1)}>▶</button>
      </BottonWrapper>
    </CarouselSingleWrapper>
  );
}

const CarouselSingleWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;
const BottonWrapper = styled.div`
  margin-top: 12px;

  display: flex;

  button {
    outline: none;
    border: none;
    user-select: none;
    padding: 10px 12px;

    &:first-of-type {
      margin-right: 15px;
    }

    &:hover {
      cursor: pointer;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
const SliderCard = styled.div`
  position: relative;
  height: 240px;
  width: 400px;
  overflow: hidden;

  @media only screen and (max-width: 375px) {
    height: 300;
    width: 240px;
  }
`;
const SliderCardBody = styled(motion.img)`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;

  will-change: transform, opacity;
  border-radius: 8px;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
`;

const IndicatorWrapper = styled.div`
  display: flex;
`;
const Indicator = styled.div<{ $isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${(props) => (props.$isActive ? "#3b3b3b" : "#aeaeae")};
  margin: 4px;
  &:hover {
    cursor: pointer;
  }
`;
export default CarouselSingle;
