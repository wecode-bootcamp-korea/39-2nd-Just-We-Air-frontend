import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const StyledSliderOne = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;

  .slick-prev::before,
  .slick-next::before {
    opacity: 1;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;
const ImageOne = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 50%;
`;
const PreOne = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 3%;
  z-index: 3;
  top: 102px;
  cursor: pointer;
`;

const NextToOne = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3%;
  z-index: 3;
  top: 102px;
  cursor: pointer;
`;
const CountryTextbox = styled.div`
  margin-top: 30px;
  display: block;
  text-align: center;
`;
const CountryText = styled.div`
  font-size: 22px;
  margin-top: 1px;
`;

const CountryTextTitle = styled.div`
  margin-top: 20px;
`;
const CountryTextAll = styled.span``;
const CountryTextPrice = styled.span`
  font-size: 25px;
  font-weight: 700;
`;
const CountryTextBlock = styled.div`
  margin-top: 10px;
`;
const CountryTextDate = styled.span``;

export default function SimpleSlider(props) {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    arrows: true,
    speed: 800,
    autoplayspeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: (
      <NextToOne>
        <img src="/images/next-arrow.svg" />
      </NextToOne>
    ),
    prevArrow: (
      <PreOne>
        <img src="/images/prev-arrow.svg" />
      </PreOne>
    ),
  };

  return (
    <div>
      <StyledSliderOne {...settings}>
        <div>
          <ImageOne src="images/Tokyo.jpeg" />
          <CountryTextbox>
            <CountryText>서울(인천) - 도쿄</CountryText>
            <CountryTextTitle>
              <CountryTextAll>편도총액 </CountryTextAll>
              <CountryTextPrice>300,009원~</CountryTextPrice>
              <CountryTextBlock>
                <CountryTextDate>2022.12.24 ~ 2022.12.26</CountryTextDate>
              </CountryTextBlock>
            </CountryTextTitle>
          </CountryTextbox>
        </div>
        <div>
          <ImageOne src="images/jeju.jpeg" />
          <CountryTextbox>
            <CountryText>서울(김포) - 제주</CountryText>
            <CountryTextTitle>
              <CountryTextAll>편도총액 </CountryTextAll>
              <CountryTextPrice>500,109원~</CountryTextPrice>
              <CountryTextBlock>
                <CountryTextDate>2023.01.02 ~ 2023.01.21</CountryTextDate>
              </CountryTextBlock>
            </CountryTextTitle>
          </CountryTextbox>
        </div>
        <div>
          <ImageOne src="images/osaka.jpeg" />
          <CountryTextbox>
            <CountryText>서울(인천) - 오사카</CountryText>
            <CountryTextTitle>
              <CountryTextAll>편도총액 </CountryTextAll>
              <CountryTextPrice>409,500원~</CountryTextPrice>
              <CountryTextBlock>
                <CountryTextDate>2023.01.06 ~ 2023.01.19</CountryTextDate>
              </CountryTextBlock>
            </CountryTextTitle>
          </CountryTextbox>
        </div>
        <div>
          <ImageOne src="images/Gaum.png" />
          <CountryTextbox>
            <CountryText>서울(인천) - 괌</CountryText>
            <CountryTextTitle>
              <CountryTextAll>편도총액 </CountryTextAll>
              <CountryTextPrice>623,000원~</CountryTextPrice>
              <CountryTextBlock>
                <CountryTextDate>2023.01.03 ~ 2023.02.10</CountryTextDate>
              </CountryTextBlock>
            </CountryTextTitle>
          </CountryTextbox>
        </div>
        <div>
          <ImageOne src="images/Fukuoka.jpeg" />
          <CountryTextbox>
            <CountryText>서울(인천) - 후쿠오카</CountryText>
            <CountryTextTitle>
              <CountryTextAll>편도총액 </CountryTextAll>
              <CountryTextPrice>823,000원~</CountryTextPrice>
              <CountryTextBlock>
                <CountryTextDate>2023.01.09 ~ 2023.02.03</CountryTextDate>
              </CountryTextBlock>
            </CountryTextTitle>
          </CountryTextbox>
        </div>
      </StyledSliderOne>
    </div>
  );
}
