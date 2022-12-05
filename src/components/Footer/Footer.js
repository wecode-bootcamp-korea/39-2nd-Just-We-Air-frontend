import React from 'react';
import styled from 'styled-components';

function Footer() {
  const scrollButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <FooterMainBox>
      <FooterTopMenu>
        <FooterMenu>
          <MenuTitle>JUST WE AIR</MenuTitle>
          <MenuSublist>
            <ListText>마이페이지</ListText>
            <ListText>예약조회</ListText>
          </MenuSublist>
        </FooterMenu>
        <MenuSublist>
          <MenuTitle>여행준비 안내</MenuTitle>
          <MenuSublist>
            <ListText>국제선 운임</ListText>
            <ListText>국내선 운임</ListText>
          </MenuSublist>
        </MenuSublist>
        <FooterMenu>
          <MenuTitle>탑승수속안내</MenuTitle>
          <MenuSublist>
            <ListText>수하물</ListText>
            <ListText>빠른 수속</ListText>
          </MenuSublist>
        </FooterMenu>
        <FooterMenu>
          <MenuTitle>고객센터</MenuTitle>
          <MenuSublist>
            <ListText>공지사항</ListText>
            <ListText>기내 유실물 센터</ListText>
          </MenuSublist>
        </FooterMenu>
      </FooterTopMenu>
      <FooterInside>
        <FooterWrap>
          <FooterTextBox>
            <FooterText>
              <LeftFooter>
                <CallCenter>고객센터</CallCenter>
                <CallCenterPhone>1588-828200</CallCenterPhone>
                <CallTime> 10:00 ~ 14:00 (주말, 공휴일 제외)</CallTime>
              </LeftFooter>
              <RightFooter>
                <p>(주) JUST WE AIR</p>

                <p>
                  서울특별시 강남구 테헤란로 427 10층
                  <br /> 대표이사 : 오주형
                </p>
                <p>개인정보관리책임자 : 남연우</p>
                <p>사업자 번호 : 02-8282-8282&nbsp; </p>
                <p>통신판매업신고 : 제 8282-서울강남구-8282호</p>
                <p>
                  계좌 : 위에어은행 1004-8282-8282 &nbsp;(주) JUST WE AIR&nbsp;
                </p>
                <p>호스팅 제공자 : (주)JUST WE AIR</p>
                <p>이메일 : JUSTWEAIR@we.co.kr</p>
                <p>팩스:078-8282-8282</p>
              </RightFooter>
            </FooterText>
          </FooterTextBox>
        </FooterWrap>
      </FooterInside>

      <TopButton onClick={scrollButton}>
        <i class="fas fa-chevron-up fa-3x"></i>
      </TopButton>
    </FooterMainBox>
  );
}

export default Footer;

const FooterMainBox = styled.footer`
  width: 100%;
  border-top: 1px solid #ff5000;
  background-color: #ffffff;
`;

const FooterTopMenu = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 1000px;
  padding-left: 0px;
  margin: 0 auto;
  padding-bottom: 13px;
`;

const FooterMenu = styled.div``;

const MenuTitle = styled.div`
  padding: 16px 0;
  color: #212224;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
`;

const MenuSublist = styled.div`
  display: flex;
  flex-direction: column;
  color: #212224;
  font-size: 15px;
  cursor: pointer;
`;

const ListText = styled.a``;

const FooterInside = styled.div`
  background-color: #ffffff;
  color: #212224;
  font-size: 12px;
`;

const FooterWrap = styled.div``;
const FooterTextBox = styled.div`
  border: 1px solid #efefef;
`;

const FooterText = styled.div`
  padding-top: 15px;
  width: 1000px;
  padding-left: 0px;
  margin: 0 auto;
  width: 1000px;
  padding-left: 0px;
  margin: 0 auto;
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const LeftFooter = styled.div`
  font-size: 15px;
`;

const CallCenter = styled.p`
  padding-bottom: 25px;
  font-size: 25px;
`;

const CallCenterPhone = styled.p`
  font-size: 40px;
`;
const CallTime = styled.p``;

const RightFooter = styled.div``;

const FooterNav = styled.div``;

const FooterPolicy = styled.div``;

const TopButton = styled.button`
  position: fixed;
  z-index: 99;
  right: 20px;
  padding: 6px;
  transition: 0.3s;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  @include flex(center, center);

  &:hover {
    scale: 1.05;
    transition: 0.3s;
  }
`;

const TobBtnIcon = styled.i``;
