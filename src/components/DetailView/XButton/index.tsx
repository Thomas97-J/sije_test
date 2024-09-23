import React from "react";
import styled from "styled-components";

const XButton = ({ onClick }) => {
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
  position: fixed;
  z-index: 1002;
`;

const CloseIcon = styled.span`
  color: #575757d1; /* X 아이콘 색상 */
  font-size: 24px; /* X 아이콘 크기 */
  line-height: 1; /* 줄 높이 조절 */
  transform: scale(0.8); /* 크기를 0.5배로 줄임 */
  &:hover {
    color: #ffffffa6; /* hover 시 색상 변경 */
  }
`;

export default XButton;
