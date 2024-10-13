import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

// ExamAccessTest
const addExamCart = (currentId) => {
    axios.post('http://localhost:8080/api/addExamCart', { examID : currentId.id })
        .then(_response => {
            alert('모의고사가 담겼습니다.');
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('An error occurred');
            }
        });
};


function Board() {
    let { id } = useParams();
    const mockTests = useSelector((state) => state.mockTests.mockTests);
    console.log(mockTests[id-1])
    let currentId = mockTests[id-1]
    return (
        <div>

            <div className="row">
                <div className="col-md-6">
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>
                    <div>모의고사 미리보기 ~~~~~~~~~</div>

                </div>

                <div className="col-md-6">
                    <h4 className="pt-5"> 게시판 {currentId.id}의 타이틀 임</h4>
                    <p> 게시판{currentId.id} 내용 임.</p>
                    <p>정보 : {currentId.name}</p>
                    <button className="btn btn-danger" onClick={() => addExamCart(currentId)} >나의 gast에 담기</button>
                </div>
            </div>
        </div>
    );
}

export default Board;