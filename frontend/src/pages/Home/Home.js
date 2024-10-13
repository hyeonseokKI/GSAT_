

import "./home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-title">
        <span>GSAT 연습장</span>에 오신걸 환영합니다
      </div>
      <div className="home-contents">
        모의고사 대기중 ! 📝<br/>
        문제를 만들어 등록하면 200포인트 ✏️
      </div>
      <div className="about-project">
        {/* 이 프로젝트는 Duckgugong이 레퍼런스로 쓰기위해<br/>
        <span>React</span>와
        <span> TypeORM</span>으로 만들었습니다😎 */}
      </div>
      <div className="my-website">
        <div className="my-website-title">GAST's Website</div>
        <a href="https://github.com/donggundg/GSAT" target="_blank">
          🏴GitHub
        </a>

      </div>
    </div>
  )
}
export default Home;







// import { Carousel, } from 'react-bootstrap';

// test
// const data = [
//   {
//       image: 'about_1.png',
//       caption: "Caption",
//       description: "Description Here"
//   },
//   {
//       image: 'about_1.png',
//       caption: "Caption",
//       description: "Description Here"
//   },
//   {
//       image: 'about_1.png',
//       caption: "Caption",
//       description: "Description Here"
//   }
// ]

// const [index, setIndex] = useState(0);

// const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
// };


            {/* <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
                {data.map((slide, i) => {
                    return (
                        <Carousel.Item>
                            <img
                                className="d-block w-10"
                                src={slide.image}
                                alt="slider image"
                                style={{ height: "500px", width: "100%" }}
                            />
                            <Carousel.Caption>
                                <h3 >{slide.caption}</h3>
                                <p>{slide.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}

            </Carousel> */}