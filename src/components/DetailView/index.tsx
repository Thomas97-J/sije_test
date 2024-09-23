import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import XButton from "./XButton";

function DetailView({ selectedImage, handleDetailviewClose }) {
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
  position: fixed;
  justify-content: flex-end;
  top: 60px;
  width: calc(100vw - 120px);
  max-height: calc(100vh - 120px);
  z-index: 1001;
  overflow-y: scroll;
  border-radius: 8px;
  &::-webkit-scrollbar {
    width: 8px;
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
`;
const DetailBody = styled(motion.div)`
  display: flex;
  position: relative;

  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
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
