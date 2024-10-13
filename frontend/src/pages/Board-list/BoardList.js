
import { useState } from 'react';
import { Table, Pagination, Nav, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function BoardList() {

    let navigate = useNavigate();
    // Create an array with 100 mock test names
    const mockTests = useSelector((state) => state.mockTests.mockTests);
    // console.log(mockTests[0])

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the indices for slicing the array
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mockTests.slice(indexOfFirstItem, indexOfLastItem);
    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Create pagination items
    const totalPages = Math.ceil(mockTests.length / itemsPerPage);
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <>
            <section id="title">
                <h1>게시판 타이틀임</h1>
            </section>
            <Row>
            <Col>            <input></input>
            <button onClick={()=>{
                alert('미구현')
            }}>검색</button></Col>
                <Col>            <Pagination className="justify-content-center">{paginationItems}</Pagination>
                </Col>
            </Row>

            <div className="col-md-12">
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th >모의고사명</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {currentItems.map((test, index) => (
                            <tr key={index} onClick={() => {
                                navigate(`/board-list/${indexOfFirstItem + index + 1}`)
                            }}>
                                <td >{indexOfFirstItem + index + 1}</td>
                                <td colSpan={2} >{test}</td>
                            </tr>
                        ))}
                    </tbody> */}
                    <tbody>
                        {currentItems.map((test, index) => (
                            <tr key={test.id} onClick={() => {
                                navigate(`/board-list/${indexOfFirstItem + index + 1}`)
                            }}>
                                <td>{test.id}</td>
                                <td>{test.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </>

    );
}

export default BoardList;