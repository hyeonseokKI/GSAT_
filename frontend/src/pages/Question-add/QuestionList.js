import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
    const questions = useSelector((state) => state.questions.questions);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleRowClick = async (id) => {
        try {
            const response = await axios.get(`/question-list/${id}`);
            if (response.status === 200) {
                const updatedQuestion = response.data;
                setSelectedQuestion(updatedQuestion);
                navigate(`/question-list/${id}`);
            }
        } catch (error) {
            console.error('Error updating views:', error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const totalPages = Math.ceil(questions.length / itemsPerPage);

    const renderPaginationItems = () => {
        const paginationItems = [];

        // Previous page button
        if (currentPage > 1) {
            paginationItems.push(
                <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} />
            );
        }

        // Always show the first 3 pages
        for (let number = 1; number <= Math.min(3, totalPages); number++) {
            paginationItems.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        // Show last 3 pages if total pages are more than 3
        if (totalPages > 3) {
            paginationItems.push(<Pagination.Ellipsis key="last-ellipsis" disabled />);
            for (let number = totalPages - 2; number <= totalPages; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        }

        // Next page button
        if (currentPage < totalPages) {
            paginationItems.push(
                <Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} />
            );
        }

        return paginationItems;
    };

    return (
        <div>
            <h1>제보방</h1>
            <Row>
                <Col>
                    <input />
                    <button onClick={() => { alert('미구현') }}>검색</button>
                </Col>
                <Col>
                    <Pagination className="d-flex justify-content-center">{renderPaginationItems()}</Pagination>
                </Col>
                <Col>
                    <Button variant="outline-danger" onClick={() => {
                        navigate('/question-add')
                    }}>글 쓰기</Button>
                </Col>
            </Row>
            <Table hover>
                <thead>
                <tr>
                    <th style={{ width: '10%' }}>번호</th>
                    <th style={{ width: '50%' }}>제목</th>
                    <th style={{ width: '15%' }}>작성자</th>
                    <th style={{ width: '10%' }}>조회 수</th>
                    <th style={{ width: '15%' }}>좋아요</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((question) => (
                    <tr key={question.id} onClick={() => handleRowClick(question.id)}>
                        <td>{question.id}</td>
                        <td>{question.title}</td>
                        <td>{question.author}</td>
                        <td>{question.views}</td>
                        <td>{question.likes}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default QuestionList;
