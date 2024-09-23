import styled from "styled-components";
import { motion } from "framer-motion";

function ThumbnailCard({
  image,
  layoutId,
  onClick,
}: {
  image: UnsplashImage;
  layoutId: string;
  onClick: () => void;
}) {
  return (
    <ThumbnailCardWrapper
      layoutId={layoutId}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
    </ThumbnailCardWrapper>
  );
}

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
`;

export default ThumbnailCard;
