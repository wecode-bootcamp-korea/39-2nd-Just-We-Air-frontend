import React, { useState, useEffect, useLocation } from 'react';
import styled from 'styled-components';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import API from './../../config';

export default function PaymentConfirm() {
  //백에서 북킹 인포메이션 갖고 오기
  const [bookingInfo, setBookingInfo] = useState([]);
  console.log(bookingInfo);
  const accessToken = localStorage.getItem('accessToken');
  // const { state } = useLocation();

  // const { arrivalSeat, departureSeat, userInfo } = state;

  // const A = 132800;
  // const B = 62400;

  // const totalPrice = arrivalSeat.price + departureSeat.price + A + B;
  // console.log(bookingInfo);

  useEffect(() => {
    fetch(API.payment, {
      //백이랑 통신할때는 이걸로 바꾸기
      // fetch('/data/orderData.json', {
      //목데이터는 이렇게 호출
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(result => setBookingInfo(result));
  }, []);

  //토스랑 결제 통신
  const REACT_APP_CLIENTKEY = `${process.env.REACT_APP_CLIENTKEY}`;

  const onClickPaymentHandler = () =>
    loadTossPayments(REACT_APP_CLIENTKEY).then(tossPayments => {
      tossPayments.requestPayment('카드', {
        amount: `${bookingInfo.total_price}`,
        orderId: `${bookingInfo.order_number}`,
        orderName: `${bookingInfo.order_number}`,
        customerName: '박토스',
        successUrl: 'http://localhost:3000/payment-success',
        failUrl: 'http://localhost:3000/payment',
        flowMode: 'DIRECT',
        easyPay: '토스페이',
      });
    });
  //결제버튼 state값 변경 식
  const [methodName, SetMethodName] = useState({
    name: '',
  });
  const updatePaymentName = e => {
    SetMethodName({ ...methodName, name: `${e.target.name}` });
  };
  console.log(bookingInfo);
  return (
    <PaymentWrapper>
      <ConfirmPayment>결제 확인</ConfirmPayment>
      <TermsBox>
        <TermsLeft>
          <Terms>결제 방법</Terms>
        </TermsLeft>

        <TermsRight>
          <TermTitle>간편 결제</TermTitle>
          <ContentsWrap>
            <PaymentBoxWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="삼성페이"
                  name="삼성페이"
                  src="/images/samsungpay.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="페이팔페이"
                  name="페이팔 페이"
                  src="/images/paypal-logo.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="유니언페이"
                  name="유니언 페이"
                  src="/images/unionpay.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="위챗페이"
                  name="WeChat 페이"
                  src="/images/wechatpay.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="카카오페이"
                  name="카카오페이"
                  src="/images/kakaopay.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="토스페이"
                  name="토스페이"
                  src="/images/Toss.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
              <PaymentMethodWrapper>
                <PaymentMethod
                  alt="네이버페이"
                  name="네이버페이"
                  src="/images/naverpay.png"
                  onClick={updatePaymentName}
                />
              </PaymentMethodWrapper>
            </PaymentBoxWrapper>
            <TotalPriceWrapper>
              <TotalPrice>총 결제 금액</TotalPrice>

              <TotalPrice>
                {Math.floor(bookingInfo?.total_price).toLocaleString('ko-KR')}원
              </TotalPrice>
            </TotalPriceWrapper>
            <PaymentBtnWrapper>
              <PaymentBtn onClick={onClickPaymentHandler}>
                {methodName.name} 결제 완료 하기
              </PaymentBtn>
            </PaymentBtnWrapper>
          </ContentsWrap>
        </TermsRight>
      </TermsBox>
    </PaymentWrapper>
  );
}

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1020px;
  margin: auto;
`;

const ConfirmPayment = styled.div`
  font-size: 28px;
  font-weight: 700;
  padding-top: 40px;
  margin-bottom: 30px;
`;

const TermsBox = styled.div`
  display: flex;
  margin: auto;
`;

const TermsLeft = styled.span`
  font-size: 16px;
`;

const Terms = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 175px;
  margin-top: 85px;
`;

const TermsRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 850px;
  margin-top: 40px;
  /* background-color: #f8f8f8; */
  line-height: 28px;
  padding: 20px 60px;
`;

const TermTitle = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px 30px 0px;
  border-bottom: 1px solid #ddd;
  width: 730px;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PaymentBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  height: 300px;
`;

const PaymentMethodWrapper = styled.div`
  width: 160px;
  height: 80px;
  /* border: 2px solid #b4b5b5; */
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 1s;
  &:hover {
    border: 2px solid #ff5000;
    width: 170px;
    height: 90px;
    transition: 1s;
  }
`;

const PaymentMethod = styled.img`
  width: 140px;
  height: 40px;
  object-fit: scale-down;
  padding: 1px;
  margin: 5px;
  transition: 1s;
  &:hover {
    width: 150px;
    height: 60px;
    transition: 1s;
  }
`;

const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  width: 730px;
  font-size: 25px;
`;

const TotalPrice = styled.div`
  background-color: none;
  color: black;
  width: 140px;
  height: 50px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 550;
`;

const PaymentBtnWrapper = styled.div`
  display: flex;
`;
const PaymentBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: #ff5000;
  color: #fff;
  width: 280px;
  height: 50px;
  margin: 20px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 550;
  transition: 1s;
  &:hover {
    font-size: 18px;
    transition: 1s;
    width: 290px;
    /* height: 60px; */
  }
`;
