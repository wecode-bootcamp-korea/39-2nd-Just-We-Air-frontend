import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

const A = 132800;
const B = 62400;

export default function BookingConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { arrivalSeat, departureSeat, userInfo } = state;

  const departureCities = (id => {
    if (id === '1') return '서울(인천)';
    if (id === '2') return '서울(김포)';
    if (id === '3') return '제주';
    if (id === '4') return '도쿄(나리타)';
    if (id === '5') return '오사카(간사이)';
    if (id === '6') return '후쿠오카';
    if (id === '7') return '나고야';
    if (id === '8') return '삿포로';
    if (id === '9') return '오키나와';
    if (id === '10') return '괌';
    if (id === '11') return '사이판';
  })(departureSeat.departureIdData);

  const arrivalCities = (id => {
    if (id === '1') return '서울(인천)';
    if (id === '2') return '서울(김포)';
    if (id === '3') return '제주';
    if (id === '4') return '도쿄(나리타)';
    if (id === '5') return '오사카(간사이)';
    if (id === '6') return '후쿠오카';
    if (id === '7') return '나고야';
    if (id === '8') return '삿포로';
    if (id === '9') return '오키나와';
    if (id === '10') return '괌';
    if (id === '11') return '사이판';
  })(arrivalSeat.arrivalIdData);

  const [checkList, setCheckList] = useState({
    airfare: false,
    transporation: false,
    bannedgoods: false,
    additionalServices: false,
    notice: false,
  });

  const handleAllCheck = () => {
    if (isAllChecked) {
      setCheckList({
        airfare: false,
        transporation: false,
        bannedgoods: false,
        additionalServices: false,
        notice: false,
      });
    } else {
      setCheckList({
        airfare: true,
        transporation: true,
        bannedgoods: true,
        additionalServices: true,
        notice: true,
      });
    }
  };

  const totalPrice = arrivalSeat.price + departureSeat.price + A + B;

  const payBtn = () => {
    navigate('/payment');

    fetch(`http://10.58.52.240:3000/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('accessToken'),
      },

      body: JSON.stringify({
        total_price: totalPrice,
        orderInfo: [
          {
            ticket_option_id: departureSeat.ticket_option_id,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            birth: userInfo.birth,
            gender: userInfo.gender,
            mobile_number: userInfo.phoneNumber,
            email: userInfo.email,
          },
          {
            ticket_option_id: arrivalSeat.ticket_option_id,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            birth: userInfo.birth,
            gender: userInfo.gender,
            mobile_number: userInfo.phoneNumber,
            email: userInfo.email,
          },
        ],
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        //navigate()
      });
  };

  const isAllChecked = Object.values(checkList).every(check => check);

  // const formatArrivalDate = moment(arrivalSeat.arrivalDate)
  //   .utc('ko-KO')
  //   .format('YYYY.MM.DD LT');

  return (
    <BookingConfirmBox>
      <ConfirmAgree>확인 및 동의</ConfirmAgree>
      <ItineraryDetailsBox>
        <ItineraryDetailsLeft>
          <ItineraryDetails>여정상세</ItineraryDetails>
        </ItineraryDetailsLeft>

        <OriginatingReturnWrap>
          <ItineraryDetailsRight>
            <OriginatingFlight>가는 편</OriginatingFlight>

            <OriginatingReturnBox>
              <OriginatingReturnBoxLeft>
                <FlightNum>{departureSeat.flightNumber}</FlightNum>
                <FlightUnitDep>{departureSeat.cabin_type}</FlightUnitDep>
              </OriginatingReturnBoxLeft>

              <OriginatingReturnBoxRight>
                <FromInfoBox>
                  <FlightTimeWrap>
                    <Date>2022.12.09(금)</Date>
                    <Time>03:00</Time>
                  </FlightTimeWrap>
                  <City>{departureCities}</City>
                </FromInfoBox>
                <Arrow />
                <ToInfoBox>
                  <FlightTimeWrap>
                    <Date>2022.12.09(금)</Date>
                    <Time>05:00</Time>
                  </FlightTimeWrap>
                  <City>{arrivalCities}</City>
                </ToInfoBox>
              </OriginatingReturnBoxRight>
            </OriginatingReturnBox>
          </ItineraryDetailsRight>

          <ItineraryDetailsRight>
            <ReturnFlight>오는 편</ReturnFlight>

            <OriginatingReturnBox>
              <OriginatingReturnBoxLeft>
                <FlightNum>{arrivalSeat.flightNumber}</FlightNum>
                <FlightUnitArr>{arrivalSeat.cabin_type}</FlightUnitArr>
              </OriginatingReturnBoxLeft>

              <OriginatingReturnBoxRight>
                <FromInfoBox>
                  <FlightTimeWrap>
                    <Date>2022.12.15(목)</Date>
                    <Time>05:00</Time>
                  </FlightTimeWrap>
                  <City>{arrivalCities}</City>
                </FromInfoBox>
                <Arrow />
                <ToInfoBox>
                  <FlightTimeWrap>
                    <Date>2022.12.15(목)</Date>
                    <Time>07:00</Time>
                  </FlightTimeWrap>
                  <City>{departureCities}</City>
                </ToInfoBox>
              </OriginatingReturnBoxRight>
            </OriginatingReturnBox>
          </ItineraryDetailsRight>
        </OriginatingReturnWrap>
      </ItineraryDetailsBox>

      <FareDetailsBox>
        <FareDetailsLeft>
          <FareDetails>항목별 운임 상세</FareDetails>
        </FareDetailsLeft>

        <AirFareWrap>
          <AirFare>항공 운송료</AirFare>
          <FlightFareBox>
            <Flight>항공운임</Flight>
            <FlightFare>
              {(arrivalSeat.price + departureSeat.price).toLocaleString()}원
            </FlightFare>
          </FlightFareBox>
          <FuelSurchargeBox>
            <FuelSurcharge>유류할증료</FuelSurcharge>
            <FuelSurchargeFare>{A.toLocaleString()}원</FuelSurchargeFare>
          </FuelSurchargeBox>
          <AirportFacilityChargesBox>
            <AirportFacility>공항시설 사용료</AirportFacility>
            <AirportFacilityFare>{B.toLocaleString()}원</AirportFacilityFare>
          </AirportFacilityChargesBox>

          <EstimatedPaymentBox>
            <EstimatedPayment>예상 결제금액</EstimatedPayment>
            <EstimatedPaymentFare>
              {totalPrice.toLocaleString()}원
            </EstimatedPaymentFare>
          </EstimatedPaymentBox>
        </AirFareWrap>
      </FareDetailsBox>

      <TermsBox>
        <TermsLeft>
          <Terms>약관 및 규정 동의</Terms>
        </TermsLeft>

        <TermsWrap>
          <AgreeToAllBox onChange={handleAllCheck}>
            <AgreeToAllInput
              id="allTermsCheck"
              type="checkbox"
              checked={isAllChecked}
            />
            <AgreeToAllLabel htmlFor="allTermsCheck">전체 동의</AgreeToAllLabel>
          </AgreeToAllBox>
          {TERMS.map(term => (
            <ConditionsBox
              key={term.id}
              onChange={() =>
                setCheckList({
                  ...checkList,
                  [term.type]: !checkList[term.type],
                })
              }
            >
              <ConditionInput
                id={term.type}
                type="checkbox"
                checked={checkList[term.type]}
              />
              <CoditionLabel htmlFor={term.type}>{term.title}</CoditionLabel>
              <ArrowAnchor />
            </ConditionsBox>
          ))}
          <PaymentBtn disabled={!isAllChecked} onClick={payBtn}>
            결제하기
          </PaymentBtn>
        </TermsWrap>
      </TermsBox>
    </BookingConfirmBox>
  );
}

const TERMS = [
  { id: 0, title: '항공권 운임 규정 동의', type: 'airfare' },
  { id: 1, title: '국제선 여객운송 약관 동의', type: 'transporation' },
  { id: 2, title: '항공기 반입금지 위험물 확인', type: 'bannedgoods' },
  {
    id: 3,
    title: '부가서비스 구매, 환불 규정 동의',
    type: 'additionalServices',
  },
  { id: 4, title: '노선별 주의사항 확인 동의', type: 'notice' },
];

const BookingConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1020px;
  margin: auto;
`;

const ConfirmAgree = styled.div`
  font-size: 28px;
  font-weight: 700;
  padding-top: 40px;
  margin-bottom: 30px;
`;

const ItineraryDetailsBox = styled.div`
  display: flex;
  margin: auto;
`;

const ItineraryDetailsLeft = styled.span`
  font-size: 16px;
`;

const ItineraryDetails = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 175px;
`;

const OriginatingReturnWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItineraryDetailsRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const OriginatingFlight = styled.span`
  font-size: 16px;
`;

const OriginatingReturnBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1.5px solid #ddd;
  border-radius: 7px;
  margin-top: 10px;
  width: 850px;
  height: 115px;
`;

const OriginatingReturnBoxLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  border-right: 1.5px solid #ddd;
  padding: 40px;
`;

const FlightNum = styled.span`
  font-weight: 500;
`;

const FlightUnitDep = styled.span`
  font-weight: 600;
  color: #0ea4de;
`;

const FlightUnitArr = styled.span`
  font-weight: 600;
  color: #ff5000;
`;

const OriginatingReturnBoxRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 600px;
`;

const FromInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlightTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Date = styled.span`
  font-size: 16px;
`;

const Time = styled.span`
  font-size: 16px;
  margin-left: 5px;
`;

const City = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;

const Arrow = styled.div`
  display: inline-block;
  background-image: url('./images/BookingConfirm/oneway.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 50px;
`;

const ToInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReturnFlight = styled.span`
  font-size: 16px;
  margin-top: 40px;
`;

const FareDetailsBox = styled.div`
  display: flex;
  font-size: 18px;
`;

const FareDetailsLeft = styled.span`
  font-size: 20px;
`;

const FareDetails = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-top: 60px;
  width: 175px;
`;

const AirFareWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 850px;
  margin-top: 60px;
  background-color: #f8f8f8;
  line-height: 32px;
  padding: 20px 60px;
`;

const AirFare = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const FlightFareBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Flight = styled.div`
  font-size: 16px;
`;

const FlightFare = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const FuelSurchargeBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FuelSurcharge = styled.div`
  font-size: 16px;
`;

const FuelSurchargeFare = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const AirportFacilityChargesBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AirportFacility = styled.div`
  font-size: 16px;
`;

const AirportFacilityFare = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const EstimatedPaymentBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ff5000;
`;

const EstimatedPayment = styled.div`
  font-size: 18px;
`;

const EstimatedPaymentFare = styled.div`
  font-size: 22px;
  font-weight: 600;
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

const TermsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 850px;
  margin-top: 40px;
  /* background-color: #f8f8f8; */
  line-height: 28px;
  padding: 20px 60px;
`;

const AgreeToAllBox = styled.div`
  display: flex;
  align-items: center;

  input[type='checkbox'] {
    display: none;

    & + label {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        background: url('./images/BookingConfirm/checkbox-off.png') no-repeat;
        background-position: center;
        background-size: 25px;
        left: -35px;
        width: 25px;
        height: 25px;
      }
    }
  }

  input[type='checkbox']:checked {
    &:checked + label {
      &:after {
        content: '';
        background: url('./images/BookingConfirm/checkbox-on.png') no-repeat;
        background-position: center;
        background-size: 25px;
      }
    }
  }
`;

const AgreeToAllInput = styled.input``;

const AgreeToAllLabel = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px 30px 0px;
  border-bottom: 1px solid #ddd;
  width: 730px;
`;

const ConditionsBox = styled.div`
  display: flex;
  align-items: center;

  input[type='checkbox'] {
    display: none;

    & + label {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        background: url('./images/BookingConfirm/checkbox-off.png') no-repeat;
        background-position: center;
        background-size: 25px;
        left: -35px;
        width: 25px;
        height: 25px;
      }
    }
  }

  input[type='checkbox']:checked {
    &:checked + label {
      &:after {
        content: '';
        background: url('./images/BookingConfirm/checkbox-on.png') no-repeat;
        background-position: center;
        background-size: 25px;
      }
    }
  }
`;

const ConditionInput = styled.input``;

const CoditionLabel = styled.label`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ArrowAnchor = styled.span`
  background-image: url('./images/BookingConfirm/arrow-anchor.png');
  content: '';
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 25px;
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
`;

const PaymentBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: #ff5000;
  color: #fff;
  width: 200px;
  height: 60px;
  font-size: 18px;
  margin: 50px auto 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
