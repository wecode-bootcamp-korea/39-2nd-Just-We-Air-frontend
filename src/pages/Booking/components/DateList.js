import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

export default function DateList({
  destination,
  setSelectedDate,
  selectedDate,
  dateArr,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const listWrap = useRef();

  const handleDateBtn = value => {
    listWrap.current.style.transform = `translateX(${value}%)`;
  };

  const selectDate = date => {
    searchParams.set(
      destination === '오는 편' ? 'arrivalDate' : 'departureDate',
      '20' + date
    );
    setSearchParams(searchParams);
  };

  return (
    <>
      <AirFlightHead>
        <HeadContents>{destination}</HeadContents>
      </AirFlightHead>

      <AirFlightListBox>
        <SwipeButtonPrev onClick={() => handleDateBtn(0)} />
        <ListContentsBox>
          <ListContent ref={listWrap}>
            {dateArr.map((item, index) => (
              <ListContentsInfo
                key={index}
                id={index}
                onClick={e => {
                  setSelectedDate(Number(e.currentTarget.id));
                  selectDate(item.date);
                }} //타겟은 이벤트를 발생시킨 요소
                //커렌트타겟은 이벤트를 부여한 요소
                //이벤트객체는 스트링으로 묶임
                selectedDate={selectedDate}
              >
                <ListContentsDate>{item.date}</ListContentsDate>
                <ListContentsPrice>
                  {Number(item.lowest_price).toLocaleString()}원
                </ListContentsPrice>
              </ListContentsInfo>
            ))}
          </ListContent>
        </ListContentsBox>
        <SwipeButtonNext onClick={() => handleDateBtn(-50)} />
      </AirFlightListBox>
    </>
  );
}

const AirFlightHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #f8f8f8;
  font-weight: 600;
`;

const HeadContents = styled.div`
  width: 1004px;
`;

const AirFlightListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 0px;
`;

const ListContentsBox = styled.div`
  display: flex;
  width: 1000px;
  height: 80px;
  overflow: hidden;
`;

const ListContent = styled.div`
  display: flex;
  width: 200%;
  transform: translateX(0);
  transition: all 0.5s ease-in-out;
`;

const SwipeButtonPrev = styled.button`
  background-image: url('./images/booking/btn-prev.png');
  display: inline-block;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: #fff;
`;

const SwipeButtonNext = styled.button`
  background-image: url('./images/booking/btn-next.png');
  display: inline-block;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: #fff;
`;

const ListContentsInfo = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 143px;
  height: 80px;
  line-height: 1.5;
  border: 0;
  outline: 0;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border: ${props =>
    props.selectedDate === props.id ? '2px solid #ff5000' : 0};
  color: ${props => (props.selectedDate === props.id ? '#ff5000' : 'black')};
  font-weight: ${props => (props.selectedDate === props.id ? 600 : 400)};
  background-color: #fff;
  cursor: pointer;
  &:hover {
    border: 2px solid #ff5000;
    color: #ff5000;
    font-weight: 600;
  }
`;

const ListContentsDate = styled.div`
  font-size: 16px;
`;

const ListContentsPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
