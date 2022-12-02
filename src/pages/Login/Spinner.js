import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import styled from 'styled-components';
export default function Spinner() {
  return (
    <Wrapper>
      <SpinnerWrapper>
        <PacmanLoader color="#FF5000" size="70" />
      </SpinnerWrapper>
      <Slogan>
        당신의 여행을 처음부터 끝까지
        <br />
        쉽고 빠르게
        <br />
        <br />
        JUST WE AIR
      </Slogan>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid #ff5000;
  /* width: 1000px; */
  height: 500px;
  border-radius: 20px;
  margin: 50px 200px;
`;

const SpinnerWrapper = styled.div`
  /* display: flex;
  justify-content: center; */
  transform: translateX(-100px);
  margin-top: 50px;
`;
const Slogan = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  margin-top: 150px;
  margin-bottom: 30px;
`;
