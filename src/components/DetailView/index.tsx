import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import XButton from "./XButton";

function DetailView({
  selectedImage,
  handleDetailviewClose,
}: {
  selectedImage: UnsplashImage | null;
  handleDetailviewClose: () => void;
}) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <>
          <DetailViewWrapper
            layout
            layoutId={selectedImage?.id || ""}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <XButton onClick={handleDetailviewClose} />
            <DetailBody>
              <img
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description}
              />
            </DetailBody>
          </DetailViewWrapper>
          <Background
            onClick={handleDetailviewClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

const DetailViewWrapper = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 60px;

  background-color: #1f1f1f;
  border-radius: 8px;
  z-index: 1001;

  @media (max-width: 480px) {
    top: 30px;
  }
`;
const DetailBody = styled(motion.div)`
  display: flex;
  position: relative;

  align-items: center;
  justify-content: center;
  overflow-y: auto;
  border-radius: 8px;
  width: calc(100vw - 120px);
  height: calc(100vh - 120px);

  @media (max-width: 480px) {
    width: calc(100vw - 20px);
    height: calc(100vh - 120px);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid rgba(128, 128, 128, 0.5);
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(128, 128, 128, 0.5);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: fit-content;
  }
`;
const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 1000;
  cursor: pointer;
`;

export default DetailView;
