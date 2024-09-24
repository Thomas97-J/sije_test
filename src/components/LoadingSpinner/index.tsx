import { ClipLoader } from "react-spinners";
import styled from "styled-components";

function LoadingSpinner() {
  return (
    <LodingSpinnerWrapper>
      <ClipLoader color={"#fff"} size={100} />
    </LodingSpinnerWrapper>
  );
}
const LodingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;

export default LoadingSpinner;
