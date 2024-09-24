import styled from "styled-components";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const ThumbnailCard = forwardRef(
  (
    {
      image,
      layoutId,
      onClick,
    }: {
      image: UnsplashImage;
      layoutId: string;
      onClick: () => void;
    },
    ref: any
  ) => {
    return (
      <ThumbnailCardWrapper
        layoutId={layoutId}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        ref={ref}
      >
        <img src={image.urls.small} alt={image.alt_description} />
      </ThumbnailCardWrapper>
    );
  }
);

const ThumbnailCardWrapper = styled(motion.div)`
  display: flex;
  margin: 0 auto;
  width: 300px;
  height: 180px;
  cursor: pointer;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    width: 240px;
    height: 144px;
  }
  @media (max-width: 768px) {
    width: 30vw;
    height: 18vw;
  }
  @media (max-width: 480px) {
    width: 30vw;
    height: 30vw;
  }
`;

export default ThumbnailCard;
