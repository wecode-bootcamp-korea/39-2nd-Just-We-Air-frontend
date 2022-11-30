import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: -20px;

  .slick-prev::before,
  .slick-next::before {
    opacity: 1;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 520px;

  object-fit: cover;
`;
const Pre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 3%;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3%;
  z-index: 3;
`;

export default function MainCarousel(props) {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    arrows: false,
    speed: 2000,
    autoplayspeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    variableWidth: true,
    nextArrow: (
      <NextTo>
        <img src="/images/next-arrow.svg" />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <img src="/images/prev-arrow.svg" />
      </Pre>
    ),
  };

  return (
    <div>
      <StyledSlider {...settings}>
        {DATA.map(data => {
          return (
            <div key={data.id}>
              <Image src={data.img} />
            </div>
          );
        })}
      </StyledSlider>
    </div>
  );
}

const DATA = [
  {
    id: 1,
    img: 'images/yeongs.jpg',
    title: ' 영서님 1',
  },
  { id: 2, img: 'images/nam1.jpg', title: ' 연우님 1' },
  { id: 3, img: 'images/cheon1.jpg', title: ' 정환님 1' },
  { id: 4, img: 'images/ohju.jpg', title: ' 주형님 1' },
  { id: 5, img: 'images/yeongs1.jpg', title: ' 영서님 2' },
  { id: 6, img: 'images/nam3.jpg', title: ' 연우님 2' },
  { id: 7, img: 'images/song3.jpeg', title: ' 송현님 1' },
  { id: 8, img: 'images/cheon.jpg', title: ' 정환님 2' },
  { id: 9, img: 'images/nam2.jpg', title: ' 연우님 2' },
  { id: 10, img: 'images/song5.jpeg', title: ' 송현님 2' },
  { id: 11, img: 'images/ohju1.jpg', title: ' 주형님 2' },
  { id: 12, img: 'images/Team.jpg', title: ' 팀 ' },
];
