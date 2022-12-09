import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import DateList from './components/DateList';
import moment from 'moment';

const SEAT_COLOR = {
  스탠다드: '#0ea4de',
  플렉스: '#f58220',
  프레스티지: '#ff5000',
};

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [arrivalSeat, setArrivalSeat] = useState({});
  const [departureSeat, setDepartureSeat] = useState({});
  const [dateArr, setDateArr] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [searchParams] = useSearchParams();
  const [isArrivePage, setIsArrivePage] = useState(false);

  const isSelected = Object.keys(departureSeat).length !== 0;

  const navigate = useNavigate();

  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('arrivalDate');
  const departureIdData = searchParams.get('departureId');
  const arrivalIdData = searchParams.get('arrivalId');

  const formatDate = date => {
    const yearStr = date.getFullYear();
    const dateStr = String(date.getDate()).padStart(2, '0');
    const monthStr = String(date.getMonth() + 1).padStart(2, '0');

    return `${yearStr}${monthStr}${dateStr}`;
  };

  useEffect(() => {
    fetch(
      // '/data/data.json',
      `http://10.58.52.240:3000/booking/lowest-price?date=${departureDate}&departureId=${departureIdData}&arrivalId=${arrivalIdData}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        setDateArr(data.price);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://10.58.52.240:3000/booking/flights?date=${
        isArrivePage ? arrivalDate : departureDate
      }&departureId=${departureIdData}&arrivalId=${arrivalIdData}`,
      {
        // fetch(`/data/ticketData.json`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
      .then(res => res.json())
      .then(data => setTicketList(data.tickets));
  }, [departureDate, arrivalDate]);

  const goToBookingArrival = () => {
    if (!isArrivePage) {
      setIsArrivePage(true);

      fetch(
        // '/data/data.json',
        `http://10.58.52.240:3000/booking/lowest-price?date=${arrivalDate}&departureId=${arrivalIdData}&arrivalId=${departureIdData}`,
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
      )
        .then(res => res.json())
        .then(data => setDateArr(data.price));
    } else {
      // 예약자 정보 입력 페이지로 이동, 데이터 담아서
      navigate('/booking-details', { state: { arrivalSeat, departureSeat } });
    }
  };

  console.log(arrivalSeat, departureSeat);

  return (
    <BookingBox>
      <DateList
        destination={isArrivePage ? '오는 편' : '가는 편'}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateArr={dateArr}
      />

      <ContentsBox>
        <SortBox>
          <SortTab>
            <DepartureTime>출발시간순</DepartureTime>
            <LowestPrice>최저가순</LowestPrice>
          </SortTab>
          <ArrowDown />
          <SortTabPath>모든경로</SortTabPath> <ArrowDown />
        </SortBox>
      </ContentsBox>

      <FareList>
        {ticketList.map(ticket => {
          const departureTime = moment(ticket.departure_date)
            .utc()
            .format('LT');
          const ArrivalTime = moment(ticket.arrival_date).utc().format('LT');

          const departureDate = new Date(ticket.departure_date);
          const arrivalDate = new Date(ticket.arrival_date);

          const diffMiliseconds = arrivalDate - departureDate;
          const diffHours = Math.floor(diffMiliseconds / 3600000);
          const diffMinutes = (diffMiliseconds % 3600000) / 60000;

          return (
            <ListItem key={ticket.tickets_id}>
              <ListSummary>
                <Head>
                  <TicketNum>{ticket.flight_number}</TicketNum>
                  <Share />
                  <Wish />
                </Head>
                <TotalTimeBox>
                  <Departure>{departureTime}</Departure>
                  <TotalTime>
                    <Time>
                      {diffHours}시간 {diffMinutes}분
                    </Time>
                    <Arrow />
                  </TotalTime>
                  <Arrival>{ArrivalTime}</Arrival>
                </TotalTimeBox>
              </ListSummary>
              <FarePareTab>
                {ticket.tickets_options.map(
                  ({ ticket_option_id, cabin_type, price }) => {
                    const isSelected = isArrivePage
                      ? ticket_option_id === arrivalSeat.ticket_option_id
                      : ticket_option_id === departureSeat.ticket_option_id;

                    return (
                      <SeatTab
                        key={ticket_option_id}
                        onClick={() => {
                          if (isArrivePage) {
                            setArrivalSeat({
                              ticket_option_id,
                              price,
                              departureDate,
                              arrivalDate,
                              flightNumber: ticket.flight_number,
                              cabin_type,
                              departureIdData,
                              arrivalIdData,
                            });
                          } else {
                            setDepartureSeat({
                              ticket_option_id,
                              price,
                              departureDate,
                              arrivalDate,
                              flightNumber: ticket.flight_number,
                              cabin_type,
                              departureIdData,
                              arrivalIdData,
                            });
                          }
                        }}
                        isSelected={isSelected}
                        color={SEAT_COLOR[cabin_type]}
                      >
                        <SeatTxt
                          color={isSelected ? 'white' : SEAT_COLOR[cabin_type]}
                        >
                          {cabin_type}
                        </SeatTxt>
                        <SeatPrice isSelected={isSelected}>
                          {price.toLocaleString()}원
                        </SeatPrice>
                        {/* <SeatUnit isSelected={isSelected}>{seats}석</SeatUnit> */}
                      </SeatTab>
                    );
                  }
                )}
              </FarePareTab>
            </ListItem>
          );
        })}
      </FareList>
      {isSelected && (
        <BottomPrice>
          <PriceInfo>
            {/* <EstimatedPayment>예상 결제금액</EstimatedPayment>
            <Price>{departureSeat.price.toLocaleString()}원</Price> */}
            <SelectReturnFlight onClick={goToBookingArrival}>
              {isArrivePage ? '예약자 정보 입력하기' : '오는 편 선택하기'}
            </SelectReturnFlight>
            <ArrowUp />
          </PriceInfo>
        </BottomPrice>
      )}
    </BookingBox>
  );
}

const BookingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentsBox = styled.div`
  width: 1005px;
`;

const SortBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 35px;
  height: 70px;
`;

const SortTab = styled.select`
  color: #797979;
  font-size: 13px;
  font-weight: 600;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background: transparent;
  outline: 0;
  &::-ms-expand {
    display: none;
  }
`;

const DepartureTime = styled.option`
  font-size: 20px;
  outline: 0;
`;

const LowestPrice = styled.option`
  font-size: 20px;
`;

const ArrowDown = styled.button`
  background-image: url('./images/booking/arrow-dropdown.png');
  display: inline-block;
  width: 20px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border: 0;
  outline: 0;
  background-color: #fff;
  cursor: pointer;
`;

const SortTabPath = styled.div`
  color: #797979;
  font-size: 13px;
  font-weight: 600;
  padding-left: 15px;
`;

const FareList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  border: 1.2px solid #ddd;
  border-radius: 7px;
  overflow: hidden;
`;

const ListSummary = styled.div`
  width: 384px;
  height: 128px;
  padding: 0 24px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 16px 0 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const TicketNum = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6d6d6d;
`;

const Share = styled.span`
  background-image: url('./images/booking/ticket-list-share.png');
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 28px;
`;

const Wish = styled.span`
  background-image: url('./images/booking/ticket-list-wish.png');
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 0;
`;

const TotalTimeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 336px;
  height: 80px;
`;

const Departure = styled.p`
  font-size: 22px;
  font-weight: 700;
  width: 112px;
  text-align: left;
`;

const TotalTime = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 112px;
`;

const Time = styled.p`
  font-size: 12px;
`;

const Arrow = styled.p`
  background-image: url('./images/booking/target-arrow.png');
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-color: #fff;
  width: 88px;
  height: 6px;
`;

const Arrival = styled.p`
  width: 112px;
  font-size: 22px;
  font-weight: 700;
  text-align: right;
`;

const FarePareTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
`;

const SeatTab = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 206px;
  height: 128px;
  border: 0;
  outline: 0;
  background-color: ${({ isSelected, color }) => (isSelected ? color : '#fff')};

  /* background-color: ${props => {
    if (props.isSelected) {
      return props.color;
    } else {
      return '#fff';
    }
  }} */
  cursor: pointer;

  &:not(:first-child) {
    border-left: 1px solid #ddd;
  }
`;

const SeatTxt = styled.p`
  padding-bottom: 15px;
  font-weight: 800;
  color: ${({ color }) => color};
`;

const SeatPrice = styled.p`
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ isSelected }) => isSelected && 'white'};
`;

const SeatUnit = styled.p`
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? 'white' : '#6d6d6d')};
`;

const BottomPrice = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  box-shadow: 0 -4px 16px 0 rgb(17 17 17 / 10%);
  z-index: 10;
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1004px;
  margin: auto;
`;

const EstimatedPayment = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-right: 30px;
`;

const SelectReturnFlight = styled.button`
  width: 180px;
  height: 70px;
  background-color: #ff5000;
  color: #fff;
  font-size: 18px;
  margin-right: 30px;
  border: 0;
  cursor: pointer;
`;

const ArrowUp = styled.div`
  display: inline-block;
  width: 26px;
  height: 26px;
  background-image: url('./images/booking/arrow-up.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 28px;
  cursor: pointer;
`;
