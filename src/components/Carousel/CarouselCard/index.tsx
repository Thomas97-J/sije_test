import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function CarouselCard({
  image,
  currentIndex,
}: {
  image: any;
  currentIndex: number;
}) {
  if (!image?.urls) {
    return "";
  }
  return (
    <CarouselCardWrapper>
      <img src={image.urls.small_s3} alt={image.alt_description} />
    </CarouselCardWrapper>
  );
}

const CarouselCardWrapper = styled(motion.div)`
  display: flex;
  margin: 0 auto;
  min-width: 300px;
  height: 180px;
  cursor: pointer;
  margin: 10px;
  img {
    object-fit: cover;
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }
`;

export default CarouselCard;
