// import about_1 from './../public/about_1.png';
import './about.css'
function About() {
    return (
        <>

            <div class="container"> 
                <div class="row">

                    <div class="col-lg-6 col-md-6 text-center">
                        <div class="service-box">
                            <img class="img-resize-medium" src="about_1.png" alt="A"/>
                                <h3 class="font-KW4B p-1" style={{fontWeight:"bold"}}>더 나은 성적</h3>
                                <p class="mobile-content text-muted text-left">
                                    다음주가 시험일때, 과제가 내일까지일때, 수업을 빠졌을때, EXAMPE : GSAT의 <b style={{color:"black"}}>실전 자료</b>와 함께 단기간에 시험과 과제에 확실하게 대비하세요! 더 나은 성적을 보장합니다.
                                </p></div>
                    </div>

                    <div class="col-lg-6 col-md-6 text-center">
                        <div class="service-box">
                            <img class="img-resize-medium" src="about_3.png" alt="B"/>
                                <h3 class="font-KW4B p-1" style={{fontWeight:"bold"}}>한 학기에 자료 한 개!</h3>
                                <p class="mobile-content text-muted text-left"> EXAMPE : GSAT는 <b style={{color:"black"}}> 100% 무료 </b>서비스입니다. 한 학기에 <b style={{color:"black"}}>단 하나</b>의 자료만 올리시면, EXAMPE : GSAT의 모든 자료를 무료로 열람하시고 다운받으실 수 있습니다.</p>
                        </div>
                    </div>




                    <div class="col-lg-6 col-md-6 text-center pt-2">
                        <div class="service-box">
                            <img class="img-resize-medium" src="about_3.png" alt="C"/>
                                <h3 class="font-KW4B p-1" style={{fontWeight:"bold"}}>공정한 경쟁 문화</h3>
                                <p class="mobile-content text-muted text-left"> EXAMPE : GSAT는 시험 및 과제의 표절을 허용하지 않고 <b style={{color:"black"}}>공정한 경쟁 문화</b>를 지지합니다. 또한, 저작권법을 존중하며 본인의 자료가 원치 않게 게시되어 있는 경우, 이메일로 문의주시면 즉시 삭제조치 할 것을 약속드립니다.
                                </p></div>
                    </div>

                    <div class="col-lg-6 col-md-6 text-center pt-2">
                        <div class="service-box">
                            <img class="img-resize-medium" src="about_4.png" alt="D"/>
                                <h3 class="font-KW4B p-1" style={{fontWeight:"bold"}}>이용의 편리성</h3>
                                <p class="mobile-content text-muted text-left"><b style={{color:"black"}}>언제 어디서나, 모든 컴퓨터와 모바일에서 </b> EXAMPE : GSAT의 자료를 열람하며 공부할 수 있습니다. 모바일로 사이트에 접속하여 사진을 찍어서 바로 자료를 업로드 할 수 있으며, 다양한 이미지와 문서 확장자 파일의 업로드를 허용하여 편리한 공부환경을 제공합니다.</p>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}

export default About;