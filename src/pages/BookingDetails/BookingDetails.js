import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function BookingDetails() {
  const [userInfo, setUserInfo] = useState({
    lastName: '',
    firstName: '',
    birth: '',
    phoneNumber: '',
    email: '',
  });

  const { lastName, firstName, birth, phoneNumber, email, gender } = userInfo;

  const handleUserInfo = e => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  //휴대폰번호 하이픈 자동입력
  const [inputValue, setInputValue] = useState([]);

  const handlePhone = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  useEffect(() => {
    if (inputValue.length === 10) {
      setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (inputValue.length === 13) {
      setInputValue(
        inputValue
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      );
    }
  }, [inputValue]);

  const getUserInfo = () => {
    fetch('/data/userInfo.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => setUserInfo(data));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const sendUserInfo = () => {
    fetch('/data/userInfo.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        birth: birth,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
      }),
    })
      .then(response => response.json())
      .then(data => setUserInfo(data));
  };

  useEffect(() => {
    sendUserInfo();
  }, []);

  return (
    <BookingDetailsBox>
      <Box>
        <PageTitleWrap>
          <TitleTxt>여권 정보와 동일하게 입력해 주세요.</TitleTxt>
        </PageTitleWrap>
        <PassengerBox>
          <Passenger>
            <PersonIcon />
            <InfoText>
              <Adult>성인1</Adult>
              <EngName>
                {lastName}/{firstName}
              </EngName>
            </InfoText>
          </Passenger>
        </PassengerBox>
      </Box>

      <PassengerInfoBox>
        <PassengerInfo>탑승객 정보</PassengerInfo>

        <NameBox onChange={handleUserInfo}>
          <LastNameBox>
            <InfoLastName>성 (영문)</InfoLastName>
            <InfoLastNameInput name="lastName" value={lastName} />
          </LastNameBox>
          <FirstNameBox>
            <InfoFirstName>이름 (영문)</InfoFirstName>
            <InfoFirstNameInput name="firstName" value={firstName} />
          </FirstNameBox>
        </NameBox>

        <GenderBirthBox>
          <GenderBox>
            <GenderText>성별</GenderText>
            <RadioBox onChange={handleUserInfo}>
              <label>
                <RadioFemale
                  type="radio"
                  name="gender"
                  checked={userInfo.gender === 'female'}
                  value="female"
                  readOnly
                />
                <Female>여자</Female>
              </label>
              <label>
                <RadioMale
                  type="radio"
                  name="gender"
                  checked={userInfo.gender === 'male'}
                  value="male"
                  readOnly
                />
                <Male>남자</Male>
              </label>
            </RadioBox>
          </GenderBox>

          <BirthBox>
            <BirthText>생년월일</BirthText>
            <BirthWrap>
              <BirthInput type="date" />
            </BirthWrap>
          </BirthBox>
        </GenderBirthBox>

        <ContactInfoBox>
          <ContactInfo>대표 연락처 정보</ContactInfo>
          <ContactDetails>
            기상악화 등에 따른 항공편 지연/결항 시 알려드립니다. 휴대전화번호와
            이메일을 입력해 주세요.
          </ContactDetails>
          <NumberEmailBox>
            <PhoneNumberBox>
              <PhoneNumber>휴대전화번호</PhoneNumber>
              <PhoneNumberWrap>
                <CodeNumber value="+82" />
                <NumberInput
                  name="phoneNumber"
                  value={(phoneNumber, inputValue)}
                  onChange={(handleUserInfo, handlePhone)}
                />
              </PhoneNumberWrap>
            </PhoneNumberBox>

            <EmailBox>
              <Email>이메일</Email>

              <EmailInput
                name="email"
                value={email}
                onChange={handleUserInfo}
              />
            </EmailBox>
          </NumberEmailBox>
        </ContactInfoBox>
      </PassengerInfoBox>
    </BookingDetailsBox>
  );
}

const BookingDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 1004px;
  margin: auto;
`;

const PageTitleWrap = styled.div`
  padding-top: 40px;
`;

const TitleTxt = styled.div`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
`;

const PassengerBox = styled.div`
  display: flex;
  width: 240px;
  height: 62px;
  padding: 8px 18px 8px;
  border: 2px solid #ff5000;
  border-radius: 4px;
  transition: all 0.2s;
  margin: 30px 0px 30px 0px;
`;

const Passenger = styled.div`
  display: flex;
`;

const PersonIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('./images/BookingDetails/person-icon.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Adult = styled.span`
  font-weight: 400;
  padding-right: 20px;
  padding-bottom: 4px;
  line-height: 22px;
  color: #333;
`;

const EngName = styled.span`
  font-weight: 700;
  color: #333;
`;

const PassengerInfoBox = styled.div`
  width: 1004px;
  margin: auto;
`;

const PassengerInfo = styled.div`
  min-height: 28px;
  line-height: 28px;
  font-weight: 600;
  font-size: 18px;
`;

const NameBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1004px;
`;

const LastNameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLastName = styled.div`
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 20px;

  &:after {
    content: '*';
    color: #ff5000;
  }
`;

const InfoLastNameInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  width: 460px;
  height: 35px;
  padding-top: 30px;
  padding-bottom: 20px;
  margin-right: 40px;
  color: #9c9c9c;
  font-size: 18px;
`;

const FirstNameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoFirstName = styled.div`
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 20px;

  &:after {
    content: '*';
    color: #ff5000;
  }
`;

const InfoFirstNameInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  width: 460px;
  height: 35px;
  padding-top: 30px;
  padding-bottom: 20px;
  color: #9c9c9c;
  font-size: 18px;
`;

const GenderBirthBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1004px;
`;

const GenderBox = styled.div`
  margin-top: 15px;
`;

const GenderText = styled.div`
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 20px;

  &:after {
    content: '*';
    color: #ff5000;
  }
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Female = styled.span`
  font-size: 14px;
  margin-right: 30px;
`;

const RadioFemale = styled.input`
  display: none;

  & + ${Female} {
    position: relative;
    padding-left: 30px;

    &:before {
      position: absolute;
      top: 40%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      background-image: url('./images/BookingDetails/radio-icon.png');
      background-repeat: no-repeat;
      background-size: 20px;
      background-position: 0 0;
    }
  }

  &:checked + ${Female} {
    &:before {
      background-position: 0 -20px;
    }
  }
`;

const Male = styled.span`
  font-size: 14px;
`;

const RadioMale = styled.input.attrs({ type: 'radio' })`
  display: none;

  & + ${Male} {
    position: relative;
    padding-left: 30px;

    &:before {
      position: absolute;
      top: 40%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      background-image: url('./images/BookingDetails/radio-icon.png');
      background-repeat: no-repeat;
      background-size: 20px;
      background-position: 0 0;
    }
  }

  &:checked + ${Male} {
    &:before {
      background-position: 0 -20px;
    }
  }
`;

const BirthBox = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const BirthText = styled.div`
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 20px;

  &:after {
    content: '*';
    color: #ff5000;
  }
`;

const BirthWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const BirthInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  width: 460px;
  height: 35px;
  padding-top: 30px;
  padding-bottom: 20px;
  color: #9c9c9c;
  font-size: 18px;
`;

const ContactInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactInfo = styled.div`
  min-height: 28px;
  line-height: 28px;
  font-weight: 600;
  font-size: 18px;
  margin: 30px 0px 10px 0px;
`;

const ContactDetails = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const NumberEmailBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhoneNumberBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1004px;
`;

const PhoneNumber = styled.div`
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 20px;

  &:after {
    content: '*';
    color: #ff5000;
  }
`;

const PhoneNumberWrap = styled.div`
  display: flex;
`;

const CodeNumber = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  width: 100px;
  height: 35px;
  padding-top: 30px;
  padding-bottom: 20px;
  color: #333;
  font-size: 18px;
  margin-right: 10px;
`;

const NumberInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  width: 350px;
  height: 35px;
  padding-top: 30px;
  padding-bottom: 20px;
  color: #333;
  font-size: 18px;
`;

const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Email = styled.div`
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 20px;
  &:after {
    content: '*';
    color: #ff5000;
  }
`;

const EmailInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  width: 460px;
  height: 35px;
  padding-top: 30px;
  padding-bottom: 20px;
  color: #333;
  font-size: 18px;v`;
