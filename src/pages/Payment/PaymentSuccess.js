import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import API from '../../config';

export default function PaymentSuccess() {
  const [bookingInfo, setBookingInfo] = useState([]);
  //이메일 보내는 식

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    fetch(`http://10.58.52.240:3000/tickets`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBookingInfo(data);
      });
  }, []);
  //백에서 북킹 인포메이션 갖고 오기

  // console.log(bookingInfo, `테스트1`);

  // const accessToken = localStorage.getItem('accessToken');
  // useEffect(() => {
  //   fetch(API.payment, {
  //     //백이랑 통신할때는 이걸로 바꾸기
  //     // fetch('/data/orderData.json', {
  //     //목데이터는 이렇게 호출
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       authorization: accessToken,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(result => setBookingInfo(result));
  // }, []);

  //토스에 키값들 보내기
  const [params] = useSearchParams([]);
  const paymentKey = params.get('paymentKey');
  const order = params.get('orderId');
  const amount = params.get('amount');

  useEffect(() => {
    let axios = require('axios').default;

    let options = {
      method: 'POST',
      url: 'https://api.tosspayments.com/v1/payments/confirm',
      headers: {
        Authorization:
          'Basic dGVzdF9za19KUWJnTUdaem9yejVSNDRlTms3Vmw1RTFlbTRkOg==',
        'Content-Type': 'application/json',
      },
      data: {
        paymentKey: paymentKey,
        amount: amount,
        orderId: order,
      },
    };

    axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {});
  }, []);

  //백에 키값들 보내기
  useEffect(() => {
    let axios = require('axios').default;

    let options = {
      method: 'POST',
      url: API.paymentsuccess,
      headers: {
        Authorization:
          'Basic dGVzdF9za19vZXFSR2dZTzFyNU1PcU1hTjRiclFuTjJFeWF6Og==',
        'Content-Type': 'application/json',
      },
      data: {
        paymentKey: paymentKey,
        amount: amount,
        orderId: order,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <PaymentWrapper>
      <ConfirmDetailWrap>
        <Mascot src="./images/orange.png" />
        <ConfirmDetailTitle>항공권 결제가 완료되었습니다.</ConfirmDetailTitle>
        {/* <ConfirmDetailContent>
          {bookingInfo[0]?.id &&
            bookingInfo.map(({ id, order_number, Destination }) => (
              <>
                <RouteDetailWrap>
                  <ConfirmDetail>예약번호: </ConfirmDetail>
                  <RouteDetailContent key={id}>
                    <ConfirmDetail> &nbsp;&nbsp;{order_number}</ConfirmDetail>
                  </RouteDetailContent>
                </RouteDetailWrap>
                <RouteDetailWrap>
                  <ConfirmDetail>가는 편 </ConfirmDetail>
                  <RouteDetailContent key={id}>
                    <ConfirmDetail>
                      {' '}
                      &nbsp;&nbsp;{Destination[0].Arrival} to{' '}
                      {Destination[0].Destination}
                    </ConfirmDetail>
                  </RouteDetailContent>
                  <ConfirmDetail>오는 편 </ConfirmDetail>
                  <RouteDetailContent key={id}>
                    <ConfirmDetail>
                      {' '}
                      &nbsp;&nbsp;{Destination[1].Arrival} to{' '}
                      {Destination[1].Destination}
                    </ConfirmDetail>
                  </RouteDetailContent>
                </RouteDetailWrap>
              </>
            ))}
        </ConfirmDetailContent> */}
      </ConfirmDetailWrap>
    </PaymentWrapper>
  );
}

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1020px;
  margin: auto;
`;

const ConfirmDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

const Mascot = styled.img`
  width: 150px;
`;

const ConfirmDetailTitle = styled.div`
  text-align: center;
  font-weight: 550;
  font-size: 30px;
  margin: 30px 0;
`;
const ConfirmDetailContent = styled.div`
  margin: 30px 0;
`;

const RouteDetailWrap = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #f2f2f2;
  width: 420px;
  height: 50px;
  padding-left: 10px;
`;

const ConfirmDetail = styled.div`
  font-size: 16px;
  font-weight: 550;
`;

const RouteDetailContent = styled.div`
  font-weight: 550;
`;
