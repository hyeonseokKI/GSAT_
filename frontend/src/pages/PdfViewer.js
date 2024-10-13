import React, { useState,useEffect  } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './pdfViewer.css'; // CSS 파일 임포트
import axios from 'axios';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
// pdfjs GlobalWorkerOptions 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const pdfFileMap = {
  '1': '/testMath.pdf',
  '2': '/testChuli.pdf'
};


function PdfViewer( ) {
  const { testType } = useParams(); // Get route parameter
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(30); // Default to 30
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Adjust totalQuestions and file based on testType
    if (testType === '1') {
      setTotalQuestions(20); // 수리: 30 questions
      setFile(pdfFileMap['1']); // Set PDF file for 수리
    } else if (testType === '2') {
      setTotalQuestions(30); // 추리: 20 questions
      setFile(pdfFileMap['2']); // Set PDF file for 추리
    }

    // Reset selected options when the number of questions changes
    setSelectedOptions(Array(totalQuestions).fill(null));
  }, [testType, totalQuestions]);



  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  const handleSubmit = () => {
    const incrementedOptions = selectedOptions.map(option => (option !== null ? option + 1 : 0));
    console.log(incrementedOptions);
    axios.post('http://localhost:8080/api/submit-exam', { testType, incrementedOptions })
        .then(response => {
          console.log(response.data);
          alert('답안을 성공적으로 제출했습니다.');
        })
        .catch(error => {
          console.error('There was an error submitting the answers!', error);
          alert('답안을 제출하는 중 오류가 발생했습니다.');
        });
  };
  return (
      <>
        <Button onClick={()=>{
          navigate('/pdf-test/1')
        }}> 수리</Button>
        <Button  onClick={()=>{
          navigate('/pdf-test/2')
        }}
        >추리</Button>


        <Container fluid>
          <Row>
            <Col sm={8}>
              <div className="pdf-viewer">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(error) => console.error('Error loading PDF:', error)}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <div className="navigation">
                  <Button
                      variant="primary"
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                  >
                    이전
                  </Button>
                  <Button
                      variant="primary"
                      disabled={pageNumber >= numPages}
                      onClick={() => setPageNumber(pageNumber + 1)}
                  >
                    다음
                  </Button>
                </div>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </div>
            </Col>
            <Col sm={4}>
              <Form>
                <Table striped bordered hover>
                  <thead>
                  <tr>
                    <th >문제 번호</th>
                    {Array.from({ length: 5 }, (_, index) => (
                        <th key={index}> {index + 1}번</th>
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {Array.from({ length: totalQuestions }, (_, questionIndex) => (
                      <tr key={questionIndex}>
                        <td onClick={() => setPageNumber(questionIndex + 1)}>{questionIndex + 1} 번</td>
                        {Array.from({ length: 5 }, (_, optionIndex) => (
                            <td key={optionIndex}>
                              <Form.Check
                                  type="radio"
                                  name={`question${questionIndex}`}
                                  className="custom-radio"
                                  checked={selectedOptions[questionIndex] === optionIndex}
                                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                              />
                            </td>
                        ))}
                      </tr>
                  ))}
                  </tbody>
                </Table>
                <Button variant="success" onClick={handleSubmit}>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
  );
}

export default PdfViewer;



//     <div className="radio-buttons">
//         <Form>
//             {Array.from({ length: 30 }, (_, questionIndex) => (
//                 <div key={questionIndex} className="radio-item">
//                     <Form.Label onClick={
//                         () => setPageNumber(questionIndex + 1)
//                     }>{questionIndex + 1} 번 문제</Form.Label>
//                     {Array.from({ length: 5 }, (_, optionIndex) => (
//                         <Form.Check
//                             key={optionIndex}
//                             type="radio"
//                             label={`${optionIndex + 1} 번`}
//                             name={`${questionIndex}번`}
//                             checked={selectedOptions[questionIndex] === optionIndex}
//                             onChange={() => handleOptionChange(questionIndex, optionIndex)}
//                         />
//                     ))}
//                 </div>
//             ))}
//             <Button variant="success" onClick={handleSubmit}>Submit</Button>
//         </Form>
//     </div>