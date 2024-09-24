import React, { useEffect, useState } from "react";
import { useUnsplashInfiniteQuery } from "./hooks/useUnsplashInfiniteQuery";
import ThumbnailCard from "./components/ThumbnailCard";
import styled from "styled-components";
import DetailView from "./components/DetailView";
import CarouselSingle from "./components/CarouselSingle";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { ref, data, isLoading } = useUnsplashInfiniteQuery();
  const firstFiveImages = data?.pages[0]?.slice(0, 5) || [];
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  function handleDetailviewClose() {
    setSelectedImage(null);
  }

  function handleDetailviewOpen(image: UnsplashImage) {
    setSelectedImage(image);
  }

  return (
    <AppWrapper>
      <CarouselSingle
        firstFiveImages={firstFiveImages}
        handleDetailviewOpen={handleDetailviewOpen}
      />
      {isLoading && <LoadingSpinner />}

      <Gallery>
        <GalleryWrapper>
          {data?.pages.map((page, pageIndex) =>
            page.map((image: UnsplashImage, index: number) => {
              if (pageIndex === 0 && index < 5) {
                return "";
              }
              return (
                <ThumbnailCard
                  key={image.id + pageIndex}
                  image={image}
                  layoutId={image.id + pageIndex}
                  onClick={() =>
                    handleDetailviewOpen({ ...image, id: image.id + pageIndex })
                  }
                  ref={index === 27 ? ref : null}
                />
              );
            })
          )}
        </GalleryWrapper>
      </Gallery>
      <DetailView
        selectedImage={selectedImage}
        handleDetailviewClose={handleDetailviewClose}
      />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  @media (max-width: 1024px) {
    padding: 10px 0;
  }
`;

const Gallery = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;

  @media (max-width: 1024px) {
    gap: 8px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 4px;
  }
`;

export default App;
