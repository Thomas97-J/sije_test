import { motion, AnimatePresence, PanInfo } from "framer-motion";
import styled from "styled-components";

interface SliderProps {
  images: UnsplashImage[];
  activeImageIndex: number;
  direction: number;
  handleClick: (image: UnsplashImage) => void;
  dragStartHandler: () => void;
  dragEndHandler: (dragInfo: PanInfo) => void;
}

function Slider({
  images,
  activeImageIndex,
  direction,
  handleClick,
  dragStartHandler,
  dragEndHandler,
}: SliderProps) {
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
      opacity: 0,
    }),
  };

  const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
  };

  return (
    <SliderWrapper>
      <SliderCard>
        <AnimatePresence initial={false} custom={direction}>
          {images[activeImageIndex] ? (
            <SliderCardBody
              key={images[activeImageIndex].id}
              src={images[activeImageIndex].urls.regular}
              alt={images[activeImageIndex].alt_description}
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
              onClick={() => handleClick(images[activeImageIndex])}
            />
          ) : (
            ""
          )}
        </AnimatePresence>
      </SliderCard>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 300px;
  width: 500px;
  overflow: hidden;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 32px;
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
  @media (max-width: 480px) {
    width: 84vw;
    height: 50.4vw;
  }
`;

const SliderCardBody = styled(motion.img)`
  position: absolute;
  height: 90%;
  width: 90%;
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
export default Slider;
