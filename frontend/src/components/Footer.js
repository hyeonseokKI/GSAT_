
import './footer.css';
import { Row, Col } from 'react-bootstrap';
function Footer() {
    return (
        <>
            <footer>
                <Row>
                    <Col xs={6} md={4}>
                        <div className="footer-link">
                            {/* <p><a>About</a> · <a>Search</a> · <a>contact</a> </p> */}
                            <p><a href='/about'>About</a> · <a href='/contact'>contact</a> </p>


                            <br></br>
                            <div className='footer-bg'/>
                            © GSAT 2024
                        </div>

                    </Col>
                    <Col xs={6} md={4}>
                        <div className="footer-link">

                            <p>GSAT</p>
                            <p>email@gmail.com</p>
                            <p> 메세지/ 문의</p>
                        </div>

                    </Col>
                    <Col xs={6} md={4}>
                        <div className="footer-link">
        <a> 개인정보취급방침 | 이용약관</a>
        <br/>        
        <a>상호 : </a>         
        <br/>
        <a>       주소 :    </a>
        <br/>   
        <a> 사업자등록번호 : </a>
        <br/>   
        <a> 통신판매업신고 : </a>
        <br/>   
        <a>사업자 정보확인 </a>
        <br/>   
        <a> 대표 : </a>

        Copyright &copy; 동건,현석,수녕  
        </div>

                    </Col>
                </Row>
            </footer>
        </>
    )
}

export default Footer;