import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API from '../../config';

const emailRegExp = /^[\w-.\d*]+@[\w\d]+(\.\w{2,4})$/;

export default function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    birth: '',
  });

  const accessToken = localStorage.getItem('accessToken');

  const onClickLogin = () => {
    fetch(API.signup, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        mobile_number: mobile_number.replaceAll('-', ''),
        email,
        birth,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Updated User Infomation') {
          alert('다시 입력해 주세요');
        } else {
          alert('회원가입 축하드립니다!');
          navigate('/');
        }
      });
  };

  const handleUserInfo = event => {
    const { name, value } = event.target;

    if (name === 'last_name' || name === 'first_name') {
      const nameRegExp = /[^A-Za-z]/g;
      setUserInfo(prev => ({
        ...prev,
        [name]: value.replace(nameRegExp, ''),
      }));

      return;
    }

    if (name === 'mobile_number') {
      setUserInfo(prev => ({
        ...prev,
        [name]: value
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      }));

      return;
    }

    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const { birth, email, first_name, last_name, mobile_number } = userInfo;

  //회원가입 버튼
  const isHandleActive =
    first_name.length > 0 &&
    last_name.length > 0 &&
    emailRegExp.test(email) &&
    mobile_number.length === 13 &&
    birth.length > 0;

  return (
    <Wrapper>
      <ContentWrapper>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpSubtitle>
          회원가입에 필요한 <br />
          추가 정보를 입력해주세요.
        </SignUpSubtitle>

        <SignUpWrapper flex="column" onChange={handleUserInfo}>
          <SignUpBtnWrapper>
            <SignUpBtn
              placeholder="* 성"
              type="text"
              name="last_name"
              value={last_name}
              maxLength="10"
              required
            />
          </SignUpBtnWrapper>
          <SignUpBtnWrapper>
            <SignUpBtn
              placeholder="* 이름"
              type="text"
              name="first_name"
              value={first_name}
              maxLength="20"
              required
            />
          </SignUpBtnWrapper>
          <SignUpBtnExtra>
            * 성과 이름은 여권상의 *영문*성명으로 입력해주세요
          </SignUpBtnExtra>
          <SignUpBtnWrapper>
            <SignUpBtn
              placeholder="* 이메일"
              type="text"
              name="email"
              value={email}
              required
            />
          </SignUpBtnWrapper>
          <SignUpBtnWrapper>
            <SignUpBtn
              placeholder="* 휴대폰 번호"
              type="tel"
              name="mobile_number"
              maxLength="13"
              value={mobile_number}
              required
            />
          </SignUpBtnWrapper>
          <SignUpBtnWrapper>
            <SignUpBtn
              type="date"
              name="birth"
              value={birth}
              min="1900-01-01"
              max="2022-12-31"
              onKeyDown={e => e.preventDefault()}
              required
            />
          </SignUpBtnWrapper>
          <SignUpBtnExtra>* 생년월일을 입력해주세요</SignUpBtnExtra>
          <SignUpBtnWrapper>
            <ConfirmBtn
              disabled={!isHandleActive ? true : false}
              onClick={onClickLogin}
              type="submit"
            >
              회원 가입
            </ConfirmBtn>
          </SignUpBtnWrapper>
        </SignUpWrapper>
        <SocialSingUp>
          <MembershipSign href="#">제휴카드 발급고객 회원가입</MembershipSign>
        </SocialSingUp>
        <Reminder>
          <ReminderTitle>가입 시, 꼭 확인해 주세요.</ReminderTitle>
          <ReminderContent>
            <ReminderListWrapper>
              <ReminderList>
                제휴카드 발급 고객, 제휴사 서비스, 제주항공 이벤트 등 혜택을
                이용하실 고객님은 휴대전화나 아이핀 인증을 통해 가입해 주세요.
              </ReminderList>
              <ReminderList>
                미리 회원가입 여부를 꼭 확인해 주세요. 본인 명의 아이디가 여러
                개인 경우, 아이디별로 적립된 포인트 및 탑승 횟수 등은 통합되지
                않습니다.
              </ReminderList>
            </ReminderListWrapper>
          </ReminderContent>
        </Reminder>
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
  margin: 10px 0;
`;

const ContentWrapper = styled.div`
  width: 375px;
`;

const SignUpTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-top: 20px;
  padding: 20px 0;
  line-height: 40px;
  color: #ff5000;
`;

const SignUpSubtitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0;
  line-height: 30px;
  color: #808080;
`;

const SocialSingUp = styled.div`
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;
`;

const SignUpBtn = styled.input`
  //basic
  height: 50px;
  width: 370px;
  padding: 10px;
  margin: 5px 0;
  //font
  font-size: 14px;
  font-weight: 550;
  color: #808080;
  cursor: pointer;
  &:focus {
    outline: solid 2px #ff5000;
    border: none;
  }
  ::placeholder {
    color: #989898;
  }
`;

const SignUpBtnWrapper = styled.div`
  display: column;
  /* padding: 5px 10px; */
  padding-bottom: 5px;
  text-align: center;
`;

const SignUpBtnExtra = styled.div`
  font-size: 10px;
  padding-bottom: 10px;
  color: #ff5000;
  font-weight: 550;
`;

const ConfirmBtn = styled.button`
  height: 50px;
  width: 370px;
  font-weight: 550;
  color: #ffffff;
  background-color: #ff5000;
  border: none;
  cursor: pointer;

  &:disabled {
    height: 50px;
    width: 370px;
    font-weight: 550;
    color: #808080;
    background-color: #cecaca;
    cursor: default;
  }
`;

const MembershipSign = styled.a`
  color: #ff5000;
  text-decoration: none;
  padding: 5px 0;
  border-bottom: 1px solid red;
  width: 200px;
  font-weight: 550;
  font-size: 13px;
`;

const Reminder = styled.div`
  padding: 10px;
  background-color: #f2f2f2;
`;
const ReminderTitle = styled.div`
  font-size: 15px;
  padding: 5px 0;
  font-weight: 550;
`;

const ReminderContent = styled.div`
  font-size: 15px;
  padding: 5px 0;
  line-height: 23px;
`;

const ReminderListWrapper = styled.ul`
  padding: 15px;
`;
const ReminderList = styled.li`
  list-style-type: circle;
  font-size: 13px;
  width: 340px;
  font-weight: 550;
  color: #808080;
`;
