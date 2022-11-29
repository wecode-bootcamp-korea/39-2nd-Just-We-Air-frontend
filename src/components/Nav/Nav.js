import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeadContent = styled.header``;
const Container = styled.div`
  width: 100%;
  border: 1px solid;
`;
const ContainerOne = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 1000px;
  height: 88px;
  margin: 0 auto;
`;
const ContainerOneLogo = styled.button`
  margin-top: 2px;
  background-color: white;
  color: #ff5000;
  border: none;
  font-weight: 700;
  font-size: 27px;
  cursor: pointer;
`;
const ContainerIndexList = styled.div`
  margin: 2px 0 0 66px;
`;
const ContainerIndex = styled.button`
  margin-left: 42px;
  background-color: white;
  color: black;
  opacity: 1;
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;
export default function Nav() {
  const navigate = useNavigate();
  return (
    <HeadContent>
      <Container>
        <ContainerOne>
          <ContainerOneLogo>JUST WE AIR</ContainerOneLogo>
          <ContainerIndexList>
            <ContainerIndex onClick={() => navigate('/')}>
              항공권 예매
            </ContainerIndex>
            <ContainerIndex>마이페이지</ContainerIndex>
            <ContainerIndex onClick={() => navigate('/log-in')}>
              로그인
            </ContainerIndex>
            <ContainerIndex onClick={() => navigate('/SignUp')}>
              회원가입
            </ContainerIndex>
            <ContainerIndex>나의 예약 현황</ContainerIndex>
          </ContainerIndexList>
        </ContainerOne>
      </Container>
    </HeadContent>
  );
}
