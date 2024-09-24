import { useEffect, useState } from "react";
import { PanInfo } from "framer-motion";
import styled from "styled-components";
import { wrap } from "@popmotion/popcorn";
import Slider from "./Slider";
import Indicator from "./Indicator";
import NavigationButtons from "./NavigationButtons";

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
    const changeDirection = imageIndex >= activeImageIndex ? 1 : -1;
    setImageCount([imageIndex, changeDirection]);
  }

  if (!firstFiveImages) return null;

  return (
    <CarouselSingleWrapper>
      <Slider
        images={firstFiveImages}
        activeImageIndex={activeImageIndex}
        direction={direction}
        handleClick={handleClick}
        dragStartHandler={dragStartHandler}
        dragEndHandler={dragEndHandler}
      />
      <Indicator
        images={firstFiveImages}
        activeImageIndex={activeImageIndex}
        skipToImage={skipToImage}
      />
      <NavigationButtons swipeToImage={swipeToImage} />
    </CarouselSingleWrapper>
  );
}

const CarouselSingleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export default CarouselSingle;
