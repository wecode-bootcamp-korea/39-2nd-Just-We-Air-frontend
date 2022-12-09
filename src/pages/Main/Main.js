import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import Slide from './component/Slide';
import SlideSecond from './component/SlideSecond';
import './Main.css';
import moment from 'moment';
import theme from '../../styles/theme';

export default function Main() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);

  const [menuList, setMenuList] = useState([]);
  const [countryTabId, setCountryTabId] = useState();

  const [modalStatus, setModalStatus] = useState(false);

  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const [tripInfo, setTripInfo] = useState({
    departureId: 0,
    departureText: '',
    arrivalId: 0,
    arrivalText: '',
  });

  const navigate = useNavigate();

  let [startDay, setStartDay] = useState('');
  let [endDay, setEndDay] = useState('');

  const onChange = dates => {
    const [start, end] = dates;
    setStartDay(moment(start).format('YYYY-MM-DD'));
    setEndDay(moment(end).format('YYYY-MM-DD'));

    setStartDate(start);
    setEndDate(end);
  };

  const modalToggle = () => {
    setModalStatus(true);
  };

  const modalCloseToggle = () => {
    setModalStatus(false);
  };

  useEffect(() => {
    fetch(`http://10.58.52.240:3000/booking/cities`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMenuList(data.countries);
        setCountryTabId(data.countries[0].country_id);
      });
  }, []);

  const { departureId, departureText, arrivalId, arrivalText } = tripInfo;

  const handleDestination = (name, id) => {
    if (departureText === name) {
      alert('출발지와 도착지를 다르게 선택해주세요!');
      return;
    }

    if (departureText) {
      setTripInfo(prev => ({ ...prev, arrivalText: name, arrivalId: id }));
    } else {
      setTripInfo(prev => ({ ...prev, departureText: name, departureId: id }));
    }
  };

  return (
    <BodyWrap>
      <MainWrap>
        <QuickBooking>
          <QuickBlock>
            <MainTicketBox>
              <MainTicketContent>
                <MainTicketType>
                  <MainHeadSelect btnCol="red">왕복</MainHeadSelect>
                  <MainHeadSelect>편도</MainHeadSelect>
                  <MainHeadSelect onClick={() => navigate('/log-in')}>
                    다구간
                  </MainHeadSelect>
                </MainTicketType>
                <MainDepartBox>
                  <MainDepartTarget>
                    <TargetDepart type="button" onClick={modalToggle}>
                      <TargetDepIndex>
                        {departureText ? departureText : '출발지'}
                      </TargetDepIndex>
                    </TargetDepart>
                    <TargetBtn type="button">
                      <img src="images/arrow.png" />
                    </TargetBtn>
                    <TargetArrive type="button">
                      <TargetArrIndex>
                        {arrivalText ? arrivalText : '도착지'}
                      </TargetArrIndex>
                    </TargetArrive>
                    <TargetDate>
                      <TargetDateBtn>
                        <img src="images/dateIcon.png" />
                        <MyDatePicker
                          selected={startDate}
                          onChange={onChange}
                          startDate={startDate}
                          endDate={endDate}
                          selectsRange
                          locale={ko}
                          monthsShown={2}
                          dateFormat="yyyy-MM-dd"
                        />
                      </TargetDateBtn>
                    </TargetDate>
                  </MainDepartTarget>
                </MainDepartBox>
                <AirBtnBox>
                  <AirBtn
                    type="button"
                    onClick={() => {
                      navigate(
                        `/booking?departureDate=${startDay}&arrivalDate=${endDay}&departureId=${departureId}&arrivalId=${arrivalId}`,
                        { state: { tripInfo } }
                      );
                    }}
                  >
                    항공권 검색
                  </AirBtn>
                </AirBtnBox>
              </MainTicketContent>
            </MainTicketBox>
          </QuickBlock>
          {modalStatus && (
            <LayerStart>
              <LayerHead>
                <LayerHeadBox>
                  <LayerSearchIcon type="button">
                    <img
                      src="https://static.jejuair.net/hpgg/resources/images/icon/icon-header-search.png"
                      alt="검색"
                    />
                  </LayerSearchIcon>
                  <LayerInput
                    type="text"
                    placeholder={
                      departure ? '어디로 가시나요?' : '어디에서 출발하세요?'
                    }
                  />
                </LayerHeadBox>
              </LayerHead>
              <MainSelectBox>
                <MainTab>
                  <MainTabBtn>
                    {menuList.map(menu => (
                      <TabList key={menu.country_id}>
                        <Tab
                          onClick={() => setCountryTabId(menu.country_id)}
                          isCurrent={menu.country_id === countryTabId}
                        >
                          {menu.name}
                        </Tab>
                      </TabList>
                    ))}
                  </MainTabBtn>
                  <TabPanelBox>
                    <TabPanelText>
                      {menuList
                        .find(menu => menu.country_id === countryTabId)
                        .cities.map(data => (
                          <TabTextBtn
                            key={data.id}
                            value={data.name}
                            onClick={() => {
                              handleDestination(data.name, data.id);
                            }}
                          >
                            {data.name}
                          </TabTextBtn>
                        ))}
                    </TabPanelText>
                  </TabPanelBox>
                </MainTab>
              </MainSelectBox>
              <CloseBtnBox>
                <CloseBtn onClick={modalCloseToggle} />
              </CloseBtnBox>
            </LayerStart>
          )}
          <Slide />
          <RecommendBanner>
            <RecommendTitle>
              <RecommendTitleSign>추천 항공권</RecommendTitleSign>
            </RecommendTitle>
            <SlideSecond />
          </RecommendBanner>
        </QuickBooking>
      </MainWrap>
    </BodyWrap>
  );
}

const BodyWrap = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: inherit;
  font-weight: inherit;
  vertical-align: baseline;
`;

const MainWrap = styled.div`
  min-height: auto;
`;

const QuickBooking = styled.div`
  position: relative;
  z-index: 10;
  margin: 0;
`;

const QuickBlock = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const MainTicketBox = styled.div`
  position: relative;
  z-index: 10;
`;

const MainTicketContent = styled.div`
  position: relative;
  padding: 20px 20px 30px;
  background-color: white;
  box-sizing: border-box;
  border-radius: 5px;
  padding-bottom: 110px;
  box-shadow: 0 2px 4px 2px rgb(0 0 0 / 40%);
`;

const MainTicketType = styled.ul`
  display: flex;
  position: inherit;
  justify-content: inherit;
  margin-bottom: 25px;
`;

const MainHeadSelect = styled.li`
  color: ${props => props.btnCol};
  margin-right: 20px;
  cursor: pointer;
`;

const MainDepartBox = styled.div`
  height: 50px;
`;

const MainDepartTarget = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 6px;
  float: left;
`;

const TargetDepart = styled.button`
  position: relative;
  width: 290px;
  height: 40px;
  box-sizing: border-box;
  text-align: left;
  cursor: pointer;
  border: none;
  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const TargetDepIndex = styled.span`
  color: #aaa;

  font-size: 30px;

  font-weight: 800;
`;

const TargetBtn = styled.button`
  position: relative;
  width: 50px;
  height: 35px;

  cursor: pointer;
  background-color: white;
  border: none;
`;

const TargetArrive = styled.button`
  position: relative;
  width: 290px;
  height: 40px;
  box-sizing: border-box;
  border: none;
  text-align: right;
  cursor: pointer;
  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const TargetArrIndex = styled.span`
  color: #aaa;
  font-size: 30px;

  font-weight: 800;
`;

const TargetDate = styled.div`
  float: right;
  width: 300px;
  height: 50px;
  margin-left: 27px;
  box-sizing: border-box;
`;

const TargetDateBtn = styled.button`
  position: relative;
  display: flex;
  height: 40px;
  text-align: left;
  background-color: white;
  border: none;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const DateText = styled.span`
  display: inline-block;
  position: relative;
  padding-top: 1px;
  padding-left: 35px;
  height: 20px;
  font-size: 13px;
  vertical-align: top;
  font-weight: 700;
`;

const LayerStart = styled.div`
  display: block;
  width: 950px;
  height: 550px;
  position: absolute;
  left: 50%;

  top: 120px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 2px rgb(0 0 0 / 40%);
  background: #fff;
  transform: translateX(-50%);
  /* transform: scale(1.3) translate(-61%, 13%); */
  z-index: 10;
`;

const LayerHead = styled.div`
  height: 80px;
  padding: 10px 40px 10px 12px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const LayerHeadBox = styled.div`
  position: relative;
  padding-left: 14px;
  display: flex;
  padding-top: 16px;
`;

const LayerSearchIcon = styled.button`
  margin: 0 15px 0 0;
  background-color: white;
  border: none;

  img {
    width: 25px;
  }
`;

const LayerInput = styled.input`
  width: 100%;
  font-size: 21px;
  border: none;
`;

const MainSelectBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainTab = styled.div`
  display: flex;
`;

const MainTabBtn = styled.div`
  min-width: 255px;
  height: 470px;
  border-right: 1px solid #ddd;
  background-color: #efefef;
`;

const TabList = styled.div`
  width: 100%;
`;

const Tab = styled.button`
  position: relative;
  border: 1px solid #ddd;
  font-size: 20px;
  padding: 30px;
  width: 255px;
  text-align: left;
  background-color: white;
  border-right: ${props => (props.isCurrent ? 0 : 1)};
  background-color: ${props => (props.isCurrent ? '#white' : '#efefef')};
  border-left: 0;
  padding-top: 30px;
  cursor: pointer;
  border-top: none;
`;

const TabPanelBox = styled.div`
  margin: 0;
  padding-left: 20px;
  width: 100%;
`;

const TabPanelText = styled.div`
  position: relative;
  height: 50px;
  align-items: center;
  width: 100%;
`;

const TabTextBtn = styled.button`
  text-align: left;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  background-color: white;
  font-size: 20px;
`;

const CloseBtnBox = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
`;

const CloseBtn = styled.button`
  position: relative;
  width: 40px;
  height: 30px;
  background: none;
  cursor: pointer;
  right: 15px;
  top: 22px;
  border: none;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    transform: rotate(45deg);
    background: gray;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    transform: rotate(-45deg);
    background: gray;
  }
`;

const MyDatePicker = styled(DatePicker)`
  width: 110%;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
`;

const AirBtnBox = styled.div`
  position: absolute;
  background-color: #ff5000;
  bottom: 8px;
  width: 190px;
  height: 66px;
  left: 40%;
  color: white;
`;

const AirBtn = styled.button`
  position: relative;
  font-size: 20px;
  background: none;
  cursor: pointer;
  border: none;
  z-index: auto;
  color: white;
  padding: 22px;
  padding-left: 49px;
  font-weight: 600;
`;

const RecommendBanner = styled.div`
  display: block;
  position: relative;
  margin: 80px auto;
  width: 1000px;
  height: 500px;
  margin-top: 115px;
`;

const RecommendTitle = styled.div``;

const RecommendTitleSign = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 40px;
`;
