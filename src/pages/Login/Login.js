import React from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './KakaoAuth';
// import Spinner from './Spinner';
export default function Login() {
  return (
    <Wrapper>
      {/* <Spinner /> */}
      <ContentWrapper>
        <SignUpTitle>간편 로그인</SignUpTitle>
        <SignUpContent>
          포인트 적립에서 운임할인까지
          <br />
          해외전용 혜택을 받아보세요.
        </SignUpContent>

        <SignUpWrapper flex="column">
          <SignUpBtnWrapper>
            <SignUpBtn
              bi="url('/images/Login/naver.png')"
              Xposition="70px"
              Yposition="center"
              biHeight="50px"
              biWidth="365px"
              biSize="35px"
              btnStyle="1px solid lightgrey"
              btnRadius="3px"
              fontSz="14px"
              fontWght="550"
              fontColor="#808080"
            >
              네이버 로그인
            </SignUpBtn>
          </SignUpBtnWrapper>
          <SignUpBtnWrapper>
            <a href={KAKAO_AUTH_URL}>
              <SignUpBtn
                bi="url('/images/Login/kakao.png')"
                Xposition="70px"
                Yposition="center"
                biHeight="50px"
                biWidth="365px"
                biSize="35px"
                btnStyle="1px solid lightgrey"
                btnRadius="3px"
                fontSz="14px"
                fontWght="550"
                fontColor="#808080"
              >
                카카오 로그인
              </SignUpBtn>
            </a>
          </SignUpBtnWrapper>
          <SignUpBtnWrapper>
            <SignUpBtn
              bi="url('/images/Login/apple.png')"
              Xposition="70px"
              Yposition="center"
              biHeight="50px"
              biWidth="365px"
              biSize="32px"
              btnStyle="1px solid lightgrey"
              btnRadius="3px"
              fontSz="14px"
              fontWght="550"
              fontColor="#808080"
            >
              Apple 로그인
            </SignUpBtn>
          </SignUpBtnWrapper>
          <SignUpBtnWrapper>
            <SignUpBtn
              biHeight="50px"
              biWidth="365px"
              btnStyle="1px solid lightgrey"
              btnRadius="3px"
              fontSz="14px"
              fontWght="550"
              fontColor="#808080"
            >
              비회원 로그인
            </SignUpBtn>
          </SignUpBtnWrapper>
        </SignUpWrapper>
        <SocialSingUp>
          <MembershipSign href="#">
            아이디/비밀번호 찾기 | 회원가입
          </MembershipSign>
        </SocialSingUp>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
`;

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  flex-direction: ${props => props.flex};
  margin: 20px 0;
`;

const ContentWrapper = styled.div`
  width: 375px;
`;

const SignUpTitle = styled.div`
  font-size: 30px;
  font-weight: 550;
  padding: 20px 0;
`;

const SignUpContent = styled.div`
  font-size: 20px;
  font-weight: semi-bold;
  padding: 20px 0;
  line-height: 30px;
`;

const SocialSingUp = styled.div`
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;
`;

const SignUpBtn = styled.button`
  //basic
  height: ${props => props.biHeight};
  width: ${props => props.biWidth};
  padding-bottom: 3px;
  border-radius: ${props => props.btnRadius};
  border-style: none;
  border: ${props => props.btnStyle};
  //background
  background-image: ${props => props.bi};
  background-repeat: no-repeat;
  background-size: ${props => props.size};
  background-position-x: ${props => props.Xposition};
  background-position-y: ${props => props.Yposition};
  background-size: ${props => props.biSize};
  background-color: transparent;
  //font
  font-size: ${props => props.fontSz};
  font-weight: ${props => props.fontWght};
  color: ${props => props.fontColor};
  cursor: pointer;
`;

const SignUpBtnWrapper = styled.div`
  display: column;
  padding: 5px 10px;
  padding-bottom: 5px;
  text-align: center;
`;

const MembershipSign = styled.a`
  color: #808080;
  text-decoration: none;
  padding: 5px 0;
  width: 200px;
  font-weight: 550;
  font-size: 13px;
`;

// const Reminder = styled.div`
//   padding: 10px;
//   background-color: #f2f2f2;
// `;
// const ReminderTitle = styled.div`
//   font-size: 15px;
//   padding: 5px 0;
//   font-weight: 550;
// `;

// const ReminderContent = styled.div`
//   font-size: 15px;
//   padding: 5px 0;
//   line-height: 23px;
// `;

// const ReminderListWrapper = styled.ul`
//   padding: 15px;
// `;
// const ReminderList = styled.li`
//   list-style-type: circle;
//   font-size: 13px;
//   width: 340px;
//   font-weight: 550;
//   color: #808080;
// `;
