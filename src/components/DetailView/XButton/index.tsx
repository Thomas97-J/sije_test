import React from "react";
import styled from "styled-components";

const XButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <CloseButton onClick={onClick}>
      <CloseIcon>✖</CloseIcon>
    </CloseButton>
  );
};
const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1002;
`;

const CloseIcon = styled.span`
  color: #909090d1;
  font-size: 24px;
  line-height: 1;
  transform: scale(0.8);
  &:hover {
    color: #ffffffa6;
  }
`;

export default XButton;
